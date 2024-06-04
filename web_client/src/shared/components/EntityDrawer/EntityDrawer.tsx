import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  FormProps,
  FormInstance,
} from "antd";
import { FC, ReactNode, useEffect, useState } from "react";

interface IEntityDrawer {
  open: boolean;
  onClose: () => void;
  formContent: ReactNode;
  submitData: (value) => Promise<any>;
  formProps?: FormProps;
  // setFormInstance: React.Dispatch<
  //   React.SetStateAction<FormInstance | undefined>
  // >;
  mode: "create" | "edit";
  formInstance?: FormInstance;
}

export const EntityDrawer: FC<IEntityDrawer> = ({
  open,
  onClose,
  formContent,
  submitData,
  formProps,
  // setFormInstance,
  mode,
  formInstance,
}) => {
  // const [form] = Form.useForm();
  // const form = Form.useFormInstance();
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormProps["onFinish"] = async (value) => {
    try {
      setLoading(true);

      await submitData(value);

      onClose();
    } catch (error) {
      console.error("create/edit vehicle > ", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (form) {
  //     setFormInstance(form);
  //   }
  // }, [form, setFormInstance]);

  // useEffect(() => {
  //   if (form) {
  //     form.resetFields();
  //   }
  // }, [form, formProps?.initialValues]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={
        mode === "create"
          ? "Добавление транспортного средства"
          : "Редактирование данных"
      }
      size="large"
    >
      <Form
        form={formInstance}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ height: "100%" }}
        {...formProps}
      >
        <Flex vertical style={{ height: "100%" }} justify="space-between">
          {formContent}
          <Flex justify="space-between">
            <Space>
              <Button onClick={onClose}>Отмена</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {mode === "create" ? "Добавить" : "Сохранить"}
              </Button>
            </Space>
            <Button
              onClick={() => console.log("delete")}
              icon={<DeleteOutlined />}
              danger
            />
          </Flex>
        </Flex>
      </Form>
    </Drawer>
  );
};
