import axios from "axios";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { BASE_URL } from "../../apiService";

export const UserContext = createContext<{
  user: { isAuth: boolean };
  setUser: React.Dispatch<
    React.SetStateAction<{
      isAuth: boolean;
    }>
  >;
} | null>(null);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<{ isAuth: boolean }>({ isAuth: false });

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem("refresh_token");
      const response = await axios.post(
        `${BASE_URL}/refresh`,
        {
          refreshToken: token,
        },
        { withCredentials: true }
      );

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      setUser({ isAuth: true });
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser({ isAuth: false });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      checkAuthentication();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
