import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useUser has to be used within <UserContext.Provider>");
  }

  return user;
};
