import { Link, Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../shared/hooks";
import { Flex, Menu, MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "vehicle",
    label: <Link to={"/profile/vehicle"}>Техника</Link>,
  },
  {
    key: "requests",
    label: <Link to={"/profile/requests"}>Заявки</Link>,
  },
  {
    key: "dealings",
    label: <Link to={"/profile/dealings"}>Сделки</Link>,
  },
  {
    key: "employees",
    label: <Link to={"/profile/employees"}>Сотрудники</Link>,
  },
  {
    key: "clients",
    label: <Link to={"/profile/clients"}>Клиенты</Link>,
  },
  {
    key: "posts",
    label: <Link to={"/profile/posts"}>Управление постами</Link>,
  },
];

export const ProfilePage = () => {
  const {
    user: { isAuth },
  } = useUser();

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <Flex flex={1}>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={["vehicle"]}
        style={{ width: 256 }}
      />
      <Outlet />
    </Flex>
  );
};
