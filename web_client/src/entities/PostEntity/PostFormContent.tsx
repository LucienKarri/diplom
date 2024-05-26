import { Form, Input, Button, Upload } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { apiService } from "../../shared/apiService";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export const PostFormContent = () => {
  const form = Form.useFormInstance();
  return (
    <div>
      <Form.Item
        {...formItemLayout}
        label={"Заголовок"}
        rules={[
          {
            required: true,
            message: "Пожалуйста, заполните поле",
          },
        ]}
        key={"title"}
        name={"title"}
      >
        <Input placeholder="Заголовок" style={{ width: "60%" }} />
      </Form.Item>
      <Form.List name="paragraph">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => {
              return (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Параграфы" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Пожалуйста, добавьте параграф или удалите поле",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Параграф" style={{ width: "60%" }} />
                  </Form.Item>
                  {fields.length > 0 ? (
                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      style={{
                        position: "relative",
                        top: "4px",
                        margin: "0 8px",
                        color: "#999",
                        fontSize: "24px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    />
                  ) : null}
                </Form.Item>
              );
            })}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item
        {...formItemLayoutWithOutLabel}
        key={"file"}
        name={"attachmentId"}
      >
        <Upload
          customRequest={({ file, onSuccess }) => {
            const formData = new FormData();
            formData.append("file", file);

            apiService
              .post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((res) => {
                onSuccess(res);
                form.setFieldValue("attachmentId", res.data.id);
              });
          }}
        >
          <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
        </Upload>
      </Form.Item>
    </div>
  );
};
