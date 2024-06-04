import { FloatButton } from "antd";
import { RequestModal, UserAuth } from "../../shared/components/index.ts";
import { StyledHeader, StyledLayout } from "./Layout.styled.ts";
import { Link, Outlet, useLocation } from "react-router-dom";
import { PhoneOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export const Layout = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showFloatButton, setShowFloatButton] = useState<boolean>(true);

  const location = useLocation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowFloatButton(false);
    } else {
      setShowFloatButton(true);
    }
  }, [location.pathname]);

  return (
    <StyledLayout>
      <StyledHeader>
        <Link to={"/"}>LOGO</Link>
        <UserAuth />
      </StyledHeader>
      {showFloatButton && (
        <>
          <FloatButton
            tooltip={"Оставить заявку"}
            type="primary"
            icon={<PhoneOutlined />}
            onClick={handleOpen}
          />
          <RequestModal open={open} handleClose={handleClose} />
        </>
      )}
      <Outlet />
    </StyledLayout>
  );
};
