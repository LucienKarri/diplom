import { Button, Col, Form, FormInstance, FormProps, Input, Row } from "antd";
import { FC, useCallback, useState } from "react";
import { FormButtonsGroup } from "./SignInForm.styled";
import { apiService } from "../../../../apiService";

export interface ISignInFormData {
  password: string;
  email: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
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

        const nameParts = value.fullName
          .replace(/ {2,}/g, " ")
          .trim()
          .split(" ");

        const body = {
          firstName: nameParts[1],
          lastName: nameParts[0],
          middleName: nameParts[2],
          companyName: value.companyName,
          phoneNumber: value.phoneNumber,
          email: value.email,
          password: value.password,
        };

        await apiService.post("/users", body);

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
        label={"Название компании"}
        name={"companyName"}
        rules={[{ required: true, message: "Необходимо заполнить поле" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"ФИО"}
        name={"fullName"}
        rules={[{ required: true, message: "Необходимо заполнить поле" }]}
      >
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Form.Item
            label={"Телефон"}
            name={"phoneNumber"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
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
