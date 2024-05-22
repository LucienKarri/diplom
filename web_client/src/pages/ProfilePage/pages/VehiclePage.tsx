import { useState } from "react";
import { EntityDrawer, PageLayout, Paper } from "../../../shared/components";
import { Button, FormInstance } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormContent } from "../../../entities/VehicleEntity/FormContent";
import { apiService } from "../../../shared/apiService";

export const VehiclePage = () => {
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
        {/* <VehicleTable /> */}
        <Button
          type="primary"
          onClick={handleCreate}
          icon={<PlusOutlined />}
          size="small"
        >
          Добавить
        </Button>
        <EntityDrawer
          formContent={<FormContent />}
          submitData={(value) => apiService.post("/api/vehicle", value)}
          open={open}
          onClose={handleClose}
          setFormInstance={setFormInstance}
        />
      </Paper>
    </PageLayout>
  );
};
