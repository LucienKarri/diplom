import { Drawer, FormInstance } from "antd";
import { FC, useState } from "react";
import { VehicleForm } from "../../components";
import { IVehicle } from "../../VehicleTable";

interface IFormDrawer {
  open: boolean;
  onClose: () => void;
  fetchDataOnSuccess: () => void;
  initialValues: IVehicle | undefined;
  mode: "create" | "edit";
}

export const FormDrawer: FC<IFormDrawer> = ({
  open,
  onClose,
  fetchDataOnSuccess,
  initialValues,
  mode,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();

  const handleClose = () => {
    onClose();
    formInstance?.resetFields();
  };

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
      <VehicleForm
        onFormInstanceReady={(instance) => setFormInstance(instance)}
        initialValues={initialValues}
        fetchDataOnSuccess={fetchDataOnSuccess}
        onClose={handleClose}
        mode={mode}
      />
    </Drawer>
  );
};
