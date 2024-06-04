import { ColumnsType } from "antd/es/table";
import { IDictionaryShort, IVehicleEntity } from "./types";
import { Typography } from "antd";

const dictionaryCell = (value: IDictionaryShort) => {
  return <Typography.Text>{value.name}</Typography.Text>;
};

export const VEHICLE_ENTITY_COLUMNS: ColumnsType<IVehicleEntity> = [
  {
    title: "Бренд",
    dataIndex: "brandEntity",
    render: dictionaryCell,
  },
  {
    title: "Модель",
    dataIndex: "modelEntity",
    render: dictionaryCell,
  },
  {
    title: "Год выпуска",
    dataIndex: "year",
  },
  {
    title: "Объем кузова",
    dataIndex: "capacity",
  },
  {
    title: "Мощность двигателя",
    dataIndex: "enginePower",
  },
  {
    title: "Высота",
    dataIndex: "height",
  },
  {
    title: "Грузоподъемность",
    dataIndex: "liftingCapacity",
  },
  {
    title: "Длина",
    dataIndex: "length",
  },
  {
    title: "Крутящий момент",
    dataIndex: "torque",
  },
  {
    title: "Ширина",
    dataIndex: "width",
  },
  {
    title: "Трансмиссия",
    dataIndex: "transmissionEntity",
    render: dictionaryCell,
  },
  {
    title: "Топливо",
    dataIndex: "fuelEntity",
    render: dictionaryCell,
  },
  { title: "Стоимость", dataIndex: "price" },
];
