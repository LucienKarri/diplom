import { Button, Flex, Table } from "antd";
import { useEffect, useState } from "react";
import { apiService } from "../../shared/apiService";
import { ColumnsType } from "antd/es/table";
import { FormDrawer } from "./ui";
import { PlusOutlined } from "@ant-design/icons";

export interface IVehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  liftingCapacity: number;
  length: number;
  height: number;
  width: number;
  capacity: number;
  enginePower: number;
  torque: number;
  fuelType: string;
  transmission: string;
  description: string;
}

const columns: ColumnsType<IVehicle> = [
  {
    title: "Бренд",
    dataIndex: "brand",
    width: 128,
  },
  {
    title: "Модель",
    dataIndex: "model",
    width: 196,
  },
  {
    title: "Год выпуска",
    dataIndex: "year",
    width: 100,
  },
  {
    title: "Грузоподъемность, кг.",
    dataIndex: "liftingCapacity",
    width: 190,
  },
  {
    title: "Длина, мм.",
    dataIndex: "length",
    width: 128,
  },
  {
    title: "Высота, мм.",
    dataIndex: "height",
    width: 128,
  },
  {
    title: "Ширина, мм.",
    dataIndex: "width",
    width: 128,
  },
  {
    title: "Объем кузова, л.",
    dataIndex: "capacity",
    width: 128,
  },
  {
    title: "Можность двигателя, л.с.",
    dataIndex: "enginePower",
    width: 128,
  },
  {
    title: "Крутящий момент, кг/Н",
    dataIndex: "torque",
    width: 128,
  },
  {
    title: "Тип топлива",
    dataIndex: "fuelType",
    width: 128,
  },
  {
    title: "Тип трансмиссии",
    dataIndex: "transmission",
    width: 128,
  },
  {
    title: "Описание",
    dataIndex: "description",
    width: 256,
  },
];

export const VehicleTable = () => {
  const [data, setData] = useState<IVehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [initialValues, setInitialValues] = useState<IVehicle | undefined>();

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const response = await apiService.get<IVehicle[]>("/api/vehicle");

      setData(response.data);
    } catch (error) {
      console.error("fetch vehicle > ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setOpen(true);
    setFormMode("create");
  };

  const handleEdit = (row: IVehicle) => {
    setOpen(true);
    setFormMode("edit");
    setInitialValues(row);
  };

  const handleClose = () => {
    setOpen(false);
    setInitialValues(undefined);
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <>
      <Flex vertical gap={"middle"}>
        <Flex justify="end">
          <Button
            type="primary"
            onClick={handleCreate}
            icon={<PlusOutlined />}
            size="small"
          >
            Добавить
          </Button>
        </Flex>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey={(item) => item.id}
          pagination={false}
          scroll={{
            y: "calc(100vh  - 48px - 48px - 48px - 164px)",
          }}
          onRow={(record) => {
            return {
              onClick: () => handleEdit(record),
            };
          }}
        />
      </Flex>
      <FormDrawer
        open={open}
        onClose={handleClose}
        fetchDataOnSuccess={fetchVehicle}
        initialValues={initialValues}
        mode={formMode}
      />
    </>
  );
};
