import { RouterProvider } from "react-router-dom";
import { router } from "./routing";
import { UserProvider } from "./shared/providers/UserProvider";
import { ThemeProvider } from "styled-components";
import { theme } from "antd";

export const App = () => {
  const { token } = theme.useToken();

  return (
    <>
      <UserProvider>
        <ThemeProvider theme={token}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserProvider>
    </>
  );
};
