import { EntityTable, PageLayout, Paper } from "../../../shared/components";
import { apiService } from "../../../shared/apiService";
import {
  IRequestEntity,
  REQUEST_ENTITY_COLUMNS,
} from "../../../entities/RequestEntity";
import { IRequestEntityResponse } from "../../../entities/RequestEntity/types";
import { Drawer } from "antd";
import { useState } from "react";
import { RequestFormContent } from "../../../entities/RequestEntity/RequestFormContent";

export const RequestsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number | undefined>();

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(undefined);
  };

  const handleRowClick = (record) => {
    setOpen(true);
    setSelectedRow(record?.request_id);
  };

  return (
    <PageLayout>
      <Paper>
        <EntityTable
          tData={(res) =>
            ({
              companyName: res.createBy.companyName,
              createdDate: res.createdDate,
              lastUpdatedDate: res.lastUpdatedDate,
              status: res.status,
              email: res.createBy.email,
              firstName: res.createBy.firstName,
              id: res.createBy.id,
              lastName: res.createBy.lastName,
              middleName: res.createBy.middleName,
              phoneNumber: res.createBy.phoneNumber,
              request_id: res.id,
            } as IRequestEntity)
          }
          columns={REQUEST_ENTITY_COLUMNS}
          fetchData={() => {
            return apiService.get<IRequestEntityResponse>("/application");
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
          title={"Редактирование заявки"}
          size="large"
        >
          {/* <VehicleFormContent
            handleClose={handleClose}
            vehicleId={selectedRow}
            mode={mode}
          /> */}
          <RequestFormContent
            handleClose={handleClose}
            requestId={selectedRow}
          />
        </Drawer>
      </Paper>
    </PageLayout>
  );
};
