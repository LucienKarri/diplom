import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import { useState } from "react";

export const TableFilter = () => {
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const handleSubmit = (value: unknown) => {
    console.log(value);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <div style={{ textAlign: "right" }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
          </a>
        </Space>
      </div>
    </Form>
  );
};
