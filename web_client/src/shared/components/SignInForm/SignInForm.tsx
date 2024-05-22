import { Button, Form, FormInstance, FormProps, Input } from "antd";
import { FC, useCallback, useState } from "react";
import { FormButtonsGroup } from "./SignInForm.styled";
import { apiService } from "../../apiService";

export interface ISignInFormData {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface IFormProps {
  form: FormInstance;
  onCancel: () => void;
}

export const SignInForm: FC<IFormProps> = ({ form, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit: FormProps<ISignInFormData>["onFinish"] = useCallback(
    async (value: ISignInFormData) => {
      try {
        setLoading(true);
        await apiService.post("/users", value);

        onCancel();
      } catch (error) {
        console.error("fetch error >", error);
      } finally {
        setLoading(false);
      }
    },
    [onCancel]
  );

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item
        label={"Имя"}
        name={"firstName"}
        rules={[{ required: true, message: "Необходимо заполнить поле" }]}
      >
        <Input />
      </Form.Item>{" "}
      <Form.Item
        label={"Фамилия"}
        name={"flastName"}
        rules={[{ required: true, message: "Необходимо заполнить поле" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"Имя пользователя"}
        name={"username"}
        rules={[{ required: true, message: "Необходимо заполнить поле" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"Email"}
        name={"email"}
        rules={[
          { required: true, message: "Необходимо заполнить поле" },
          {
            type: "email",
            message: "Недействительный адрес электронной почты",
          },
        ]}
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
            Зарегистрироваться
          </Button>
        </FormButtonsGroup>
      </Form.Item>
    </Form>
  );
};
