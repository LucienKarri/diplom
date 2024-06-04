import axios from "axios";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { BASE_URL, apiService } from "../../apiService";
import { jwtDecode } from "jwt-decode";

export interface IUserInfo {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
}

interface IUser {
  userInfo?: IUserInfo;
  isAuth: boolean;
  roles?: string;
}

export const UserContext = createContext<{
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}>({
  user: {
    isAuth: false,
  },
  setUser: () => {},
});

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser>({
    isAuth: false,
  });

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

      const { data } = await apiService.get<IUserInfo>("/users");

      const decodedToken = jwtDecode(response.data.access_token);
      const roles = decodedToken.realm_access.roles.filter((item) =>
        item.startsWith("ROLE_")
      );

      setUser({ isAuth: true, userInfo: data, roles });
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser({ isAuth: false, userInfo: undefined });
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
