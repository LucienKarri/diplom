import { useState } from "react";
import { EntityTable, PageLayout, Paper } from "../../../shared/components";
import { Button, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { apiService } from "../../../shared/apiService";
import { VEHICLE_ENTITY_COLUMNS } from "../../../entities/VehicleEntity/constants";
import { VehicleFormContent } from "../../../entities/VehicleEntity/VehicleFormContent";
import { IVehicle } from "../../../entities/VehicleEntity/types";

export const VehiclePage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number | undefined>();
  const [mode, setMode] = useState<"create" | "edit">("create");

  const handleCreate = () => {
    setOpen(true);
    setMode("create");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(undefined);
  };

  const handleRowClick = (record: IVehicle) => {
    console.log(record);
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
          <VehicleFormContent
            handleClose={handleClose}
            vehicleId={selectedRow}
            mode={mode}
          />
        </Drawer>
      </Paper>
    </PageLayout>
  );
};
