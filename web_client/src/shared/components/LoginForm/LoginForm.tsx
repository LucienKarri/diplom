import { Button, Form, FormInstance, FormProps, Input } from "antd";
import { FormButtonsGroup } from "./LoginForm.styled";
import { FC, useCallback, useState } from "react";
import { apiService } from "../../apiService";
import { useUser } from "../../hooks";

export interface ILoginFormData {
  login?: string;
  password?: string;
}

interface IFormProps {
  form: FormInstance;
  onCancel: () => void;
}

export const LoginForm: FC<IFormProps> = ({ form, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();

  const onSubmit: FormProps<ILoginFormData>["onFinish"] = useCallback(
    async (value: ILoginFormData) => {
      try {
        setLoading(true);
        const response = await apiService.post("/sign-in", value);

        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        setUser({ isAuth: true });
        onCancel();
      } catch (error) {
        console.error("fetch error >", error);
      } finally {
        setLoading(false);
      }
    },
    [onCancel, setUser]
  );

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item
        label={"Логин"}
        name={"username"}
        rules={[{ required: true, message: "Необходимо заполнить поле" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"Пароль"}
        name={"password"}
        rules={[{ required: true, message: "Необходимо заполнить поле" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item noStyle>
        <FormButtonsGroup>
          <Button onClick={onCancel}>Отмена</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Войти
          </Button>
        </FormButtonsGroup>
      </Form.Item>
    </Form>
  );
};
