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
  setFormInstance: React.Dispatch<
    React.SetStateAction<FormInstance | undefined>
  >;
}

export const EntityDrawer: FC<IEntityDrawer> = ({
  open,
  onClose,
  formContent,
  submitData,
  formProps,

  setFormInstance,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormProps["onFinish"] = async (value) => {
    try {
      setLoading(true);

      console.log(value);

      await submitData(value);

      onClose();
    } catch (error) {
      console.error("create/edit vehicle > ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (form) {
      setFormInstance(form);
    }
  }, [form, setFormInstance]);

  return (
    <Drawer open={open} onClose={onClose} title={"Шторка"} size="large">
      <Form
        form={form}
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
                Жмяк
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
