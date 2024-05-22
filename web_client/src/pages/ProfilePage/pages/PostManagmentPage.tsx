import { PlusOutlined } from "@ant-design/icons";
import { EntityDrawer, PageLayout, Paper } from "../../../shared/components";
import { Button, FormInstance } from "antd";
import { FormContentPost } from "../../../entities/PostEntity/FormContent";
import { useState } from "react";
import { apiService } from "../../../shared/apiService";

export const PostManagmentPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formInstance, setFormInstance] = useState<FormInstance>();

  const handleCreate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formInstance?.resetFields();
  };

  return (
    <PageLayout>
      <Paper>
        <Button
          type="primary"
          onClick={handleCreate}
          icon={<PlusOutlined />}
          size="small"
        >
          Добавить
        </Button>
        <EntityDrawer
          formContent={<FormContentPost />}
          submitData={(value) => apiService.post("/posts", value)}
          open={open}
          onClose={handleClose}
          formProps={{
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 4 },
            },
            layout: "horizontal",
          }}
          setFormInstance={setFormInstance}
        />
      </Paper>
    </PageLayout>
  );
};
