import { ColumnsType } from "antd/es/table";
import { IDealingEntity } from "./types";
import { Space, Tag, Typography } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

export const DEALING_ENTITY_COLUMNS: ColumnsType<IDealingEntity> = [
  {
    title: "Договор",
    dataIndex: "file",
    render: (value) => {
      return (
        <Typography.Link>
          <Space>
            <FilePdfOutlined />
            {value}
          </Space>
        </Typography.Link>
      );
    },
  },
  { title: "Наименование организации", dataIndex: "companyName" },
  {
    title: "Заказчик",
    dataIndex: "user",
  },
  {
    title: "Статус",
    dataIndex: "status",
    render: (value) => {
      if (value === "done") return <Tag color="success">Выполнено</Tag>;
      if (value === "created") return <Tag>Создано</Tag>;
      if (value === "process") return <Tag color="processing">В работе</Tag>;
    },
  },
  {
    title: "Заявка",
    dataIndex: "request",
  },
  {
    title: "ТС",
    dataIndex: "vehicle",
  },
  {
    title: "Разовый платеж",
    dataIndex: "payment",
  },
  {
    title: "Итоговая сумма",
    dataIndex: "amount",
  },
  {
    title: "Дата первого платежа",
    dataIndex: "dateOfStart",
  },
  {
    title: "Дата последнего платежа",
    dataIndex: "dateOfEnd",
  },
  {
    title: "Контактный номер",
    dataIndex: "contactPhone",
  },
  {
    title: "Контактный email",
    dataIndex: "contactEmail",
  },
];

export const mockDealingData: IDealingEntity[] = [
  {
    file: "O-1",
    user: "Петров Г.А.",
    request: "RE-01",
    vehicle: "Toyota Camry",
    payment: 120000,
    amount: 5000000,
    dateOfStart: "11.09.2022",
    dateOfEnd: "11.05.2025",
    companyName: "ПАО 'Т Плюс'",
    status: "created",
    contactEmail: "petrov@tplus.ru",
    contactPhone: "+79998886655",
  },
  {
    file: "O-2",
    user: "Иванова С.Г.",
    request: "RE-02",
    vehicle: "Nissan Note",
    payment: 70000,
    amount: 2500000,
    dateOfStart: "20.12.2022",
    dateOfEnd: "11.05.2025",
    companyName: "ОАО Мечты сбываются",
    status: "process",
    contactEmail: "ivanova@mechta.ru",
    contactPhone: "+78889990011",
  },
  {
    file: "O-3",
    user: "Пилот И.М.",
    request: "RE-03",
    vehicle: "AirBus A320",
    payment: 500000,
    amount: 50000000,
    dateOfStart: "15.02.2023",
    dateOfEnd: "15.05.2035",
    companyName: "ООО Авиасейлс",
    status: "done",
    contactEmail: "pilot@aviasales.ru",
    contactPhone: "+72223334455",
  },
];
