import { Flex, FloatButton, Menu, MenuProps, Typography, theme } from "antd";
import { RequestModal, UserAuth } from "../../shared/components/index.ts";
import { StyledFooter, StyledHeader, StyledLayout } from "./Layout.styled.ts";
import { Link, Outlet, useLocation } from "react-router-dom";
import { PhoneOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Typography.Link href={`#main`}>Главная</Typography.Link>,
    key: "main",
  },
  {
    label: <Typography.Link href="#calculator">Калькулятор</Typography.Link>,
    key: "calculator",
  },
  {
    label: <Typography.Link href="#catalog">Каталог</Typography.Link>,
    key: "catalog",
  },
];

export const Layout = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showFloatButton, setShowFloatButton] = useState<boolean>(true);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState();

  const location = useLocation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowFloatButton(false);
    } else {
      setShowFloatButton(true);
    }
  }, [location.pathname]);

  return (
    <StyledLayout id="main">
      <StyledHeader style={{ background: token.colorPrimaryBg }}>
        <Link to={"/"}>
          <Flex gap={8} align="center">
            <img src={logo} height={62} />
            <Typography.Title
              level={3}
              style={{
                color: token.colorPrimaryText,
                margin: 0,
                minWidth: "max-content",
              }}
            >
              Транспортные решения
            </Typography.Title>
          </Flex>
        </Link>
        <Menu
          selectedKeys={[current || ""]}
          onClick={handleMenuClick}
          mode="horizontal"
          items={items}
          style={{
            background: token.colorPrimaryBg,
            width: "100%",
            justifyContent: "center",
          }}
        />
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
      <StyledFooter
        style={{
          background: "white",
        }}
      >
        <Flex justify="space-between">
          <Flex gap={8} align="center">
            <img src="./src/assets/logo.jpg" height={62} />
            <Typography.Title
              level={3}
              style={{
                margin: 0,
                minWidth: "max-content",
              }}
            >
              Транспортные решения
            </Typography.Title>
          </Flex>
          <Flex gap={16} align="center">
            <Flex vertical>
              <Typography.Text level={3}>
                г.Москва, ул.Ленина, д.10
              </Typography.Text>
              <Typography.Text level={3}>
                info@transsolutions.ru
              </Typography.Text>
            </Flex>
            <Typography.Title level={2} style={{ margin: 0 }}>
              +7 (495) 123-45-67
            </Typography.Title>
          </Flex>
        </Flex>
      </StyledFooter>
    </StyledLayout>
  );
};
