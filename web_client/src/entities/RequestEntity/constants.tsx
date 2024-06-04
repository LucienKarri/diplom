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
      if (value.code === "CLOSED") return <Tag color="success">Выполнено</Tag>;
      if (value.code === "CREATE") return <Tag>Создано</Tag>;
      if (value.code === "PROGRESS")
        return <Tag color="processing">В работе</Tag>;
    },
  },
  {
    title: "Заявитель",
    dataIndex: "firstName",
  },
  {
    title: "Контактный номер",
    dataIndex: "phoneNumber",
  },
  {
    title: "Контактный email",
    dataIndex: "email",
  },
];
