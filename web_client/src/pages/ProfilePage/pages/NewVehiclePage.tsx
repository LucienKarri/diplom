import { Button } from "antd";
import { EntityDrawer, PageLayout, Paper } from "../../../shared/components";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FormContent } from "../../../entities/VehicleEntity/FormContent";
import { apiService } from "../../../shared/apiService";

export const NewVehiclePage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleCreate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          formContent={<FormContent />}
          submitData={(value) => apiService.post("/api/vehicle", value)}
          open={open}
          onClose={handleClose}
        />
      </Paper>
    </PageLayout>
  );
};
