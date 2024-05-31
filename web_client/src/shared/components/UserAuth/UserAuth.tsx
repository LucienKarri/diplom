import { Button, Form, Modal } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoginForm, SignInForm } from "./ui";
import { useCallback, useState } from "react";
import { apiService } from "../../apiService";
import { useUser } from "../../hooks";

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

enum ModalType {
  login = "login",
  signIn = "signIn",
}

export const UserAuth = () => {
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
      setUser({ isAuth: false, userInfo: undefined });
    } catch (error) {
      console.error("logout error > ", error);
    }
  }, [setUser]);

  return (
    <>
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
    </>
  );
};
