import { Button, Modal, Form } from "antd";
import {
  ButtonsContainer,
  StyledHeader,
  StyledLayout,
} from "./Layout.styled.ts";
import { useCallback, useState } from "react";
import { LoginForm } from "../../shared/components/LoginForm/index.ts";
import { SignInForm } from "../../shared/components/SignInForm/index.ts";
import { Link, Outlet } from "react-router-dom";
import { apiService } from "../../shared/apiService/index.ts";
import { useUser } from "../../shared/hooks/useUser.tsx";

enum ModalType {
  login = "login",
  signIn = "signIn",
}

export const Layout = () => {
  const [open, setOpen] = useState<ModalType | null>();

  const {
    user: { isAuth },
    setUser,
  } = useUser();
  const [form] = Form.useForm();

  const onClick = useCallback((value: ModalType) => {
    setOpen(value);
  }, []);

  const onCancel = useCallback(() => {
    setOpen(null);
    form.resetFields();
  }, [form]);

  const handleLogout = useCallback(async () => {
    try {
      await apiService.post("/sign-out", {
        refreshToken: localStorage.getItem("refresh_token"),
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser({ isAuth: false });
    } catch (error) {
      console.error("logout error > ", error);
    }
  }, [setUser]);

  return (
    <StyledLayout>
      <StyledHeader>
        <Link to={"/"}>LOGO</Link>
        <ButtonsContainer>
          {isAuth ? (
            <>
              <Button>
                <Link to={"/profile"}>Личный кабинет</Link>
              </Button>
              <Button onClick={handleLogout}>Выйти</Button>
            </>
          ) : (
            <>
              <Button onClick={() => onClick(ModalType.login)}>Войти</Button>
              <Button onClick={() => onClick(ModalType.signIn)}>
                Зарегистрироваться
              </Button>
            </>
          )}
        </ButtonsContainer>
      </StyledHeader>
      <Outlet />
      <Modal
        open={!!open}
        onCancel={onCancel}
        title={open === ModalType.login ? "Вход" : "Регистрация"}
        footer={null}
      >
        {open === ModalType.login ? (
          <LoginForm form={form} onCancel={onCancel} />
        ) : (
          <SignInForm form={form} onCancel={onCancel} />
        )}
      </Modal>
    </StyledLayout>
  );
};
