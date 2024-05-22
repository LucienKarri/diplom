import { ColumnsType } from "antd/es/table";
import { IRequestEntity } from "./types";
import { Tag } from "antd";

export const REQUEST_ENTITY_COLUMNS: ColumnsType<IRequestEntity> = [
  {
    title: "Наименование организации",
    dataIndex: "companyName",
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
    title: "Заявитель",
    dataIndex: "applicant",
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

export const mockRequestData: IRequestEntity[] = [
  {
    applicant: "Петров Г.А.",
    companyName: "ПАО 'Т Плюс'",
    status: "created",
    contactEmail: "petrov@tplus.ru",
    contactPhone: "+79998886655",
  },
  {
    applicant: "Иванова С.Г.",
    companyName: "ОАО Мечты сбываются",
    status: "process",
    contactEmail: "ivanova@mechta.ru",
    contactPhone: "+78889990011",
  },
  {
    applicant: "Пилот И.М.",
    companyName: "ООО Авиасейлс",
    status: "done",
    contactEmail: "pilot@aviasales.ru",
    contactPhone: "+72223334455",
  },
];
