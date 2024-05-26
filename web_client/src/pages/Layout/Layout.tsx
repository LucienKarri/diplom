import { UserAuth } from "../../shared/components/index.ts";
import { StyledHeader, StyledLayout } from "./Layout.styled.ts";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <StyledLayout>
      <StyledHeader>
        <Link to={"/"}>LOGO</Link>
        <UserAuth />
      </StyledHeader>
      <Outlet />
    </StyledLayout>
  );
};
