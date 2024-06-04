import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../shared/hooks";
import { Flex, Menu, MenuProps } from "antd";
import { useEffect } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const itemsForAdmin: MenuItem[] = [
  {
    key: "/profile/vehicle",
    label: <Link to={"/profile/vehicle"}>Техника</Link>,
  },
  {
    key: "/profile/requests",
    label: <Link to={"/profile/requests"}>Заявки</Link>,
  },
  // {
  //   key: "dealings",
  //   label: <Link to={"/profile/dealings"}>Сделки</Link>,
  // },
  // {
  //   key: "employees",
  //   label: <Link to={"/profile/employees"}>Сотрудники</Link>,
  // },
  // {
  //   key: "clients",
  //   label: <Link to={"/profile/clients"}>Клиенты</Link>,
  // },
  // {
  //   key: "posts",
  //   label: <Link to={"/profile/posts"}>Управление постами</Link>,
  // },
];

const itemsForUser: MenuItem[] = [
  {
    key: "/profile/requests",
    label: <Link to={"/profile/requests"}>Заявки</Link>,
  },
];

export const ProfilePage = () => {
  const {
    user: { isAuth, roles },
  } = useUser();

  const navigate = useNavigate();

  const isAllowForAdmin = roles?.includes("ROLE_ADMIN");

  const items = isAllowForAdmin ? itemsForAdmin : itemsForUser;

  useEffect(() => {
    navigate(items[0]?.key as string);
  }, [items, navigate]);

  if (!isAuth) {
    console.log('User not found, navigate to "/"');
    return <Navigate to={"/"} />;
  }

  return (
    <Flex flex={1}>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={[items[0]?.key as string]}
        style={{ width: 256 }}
      />
      <Outlet />
    </Flex>
  );
};
