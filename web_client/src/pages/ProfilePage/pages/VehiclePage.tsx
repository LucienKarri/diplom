import { useState } from "react";
import { EntityTable, PageLayout, Paper } from "../../../shared/components";
import { Button, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { apiService } from "../../../shared/apiService";
import { VEHICLE_ENTITY_COLUMNS } from "../../../entities/VehicleEntity/constants";
import { VehicleFormContent } from "../../../entities/VehicleEntity/VehicleFormContent";
import { IVehicle } from "../../../entities/VehicleEntity/types";
import { FormProvider, useForm } from "react-hook-form";

const defaultValues: IVehicle = {
  brand: undefined,
  capacity: undefined,
  description: undefined,
  enginePower: undefined,
  fuel: undefined,
  height: undefined,
  id: undefined,
  length: undefined,
  liftingCapacity: undefined,
  model: undefined,
  torque: undefined,
  transmission: undefined,
  width: undefined,
  year: undefined,
};

export const VehiclePage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number | undefined>();
  const [mode, setMode] = useState<"create" | "edit">("create");

  const methods = useForm<IVehicle>({
    defaultValues: defaultValues,
  });

  const handleCreate = () => {
    setOpen(true);
    setMode("create");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(undefined);
    methods.reset(defaultValues);
  };

  const handleRowClick = (record: IVehicle) => {
    setOpen(true);
    setMode("edit");
    setSelectedRow(record?.id);
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
        <EntityTable
          columns={VEHICLE_ENTITY_COLUMNS}
          fetchData={() => {
            return apiService.get("/api/vehicle");
          }}
          onRowClick={(record) => {
            return {
              onClick: () => handleRowClick(record),
            };
          }}
        />
        <Drawer
          open={open}
          onClose={handleClose}
          title={
            mode === "create"
              ? "Добавление транспортного средства"
              : "Редактирование транспортного средства"
          }
          size="large"
        >
          <FormProvider {...methods}>
            <VehicleFormContent
              handleClose={handleClose}
              vehicleId={selectedRow}
              mode={mode}
            />
          </FormProvider>
        </Drawer>
      </Paper>
    </PageLayout>
  );
};
