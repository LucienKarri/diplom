import { ColumnsType } from "antd/es/table";
import { IUserEntity } from "./types";

export const ADMIN_ENTITY_COLUMNS: ColumnsType<IUserEntity> = [
  {
    title: "Имя",
    dataIndex: "firstName",
  },
  {
    title: "Отчество",
    dataIndex: "surname",
  },
  {
    title: "Фамилия",
    dataIndex: "lastName",
  },
  {
    title: "Должность",
    dataIndex: "role",
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

export const USER_ENTITY_COLUMNS: ColumnsType<IUserEntity> = [
  {
    title: "Название организации",
    dataIndex: "companyName",
  },
  {
    title: "Имя",
    dataIndex: "firstName",
  },
  {
    title: "Отчество",
    dataIndex: "surname",
  },
  {
    title: "Фамилия",
    dataIndex: "lastName",
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

export const mockAdminData: IUserEntity[] = [
  {
    contactEmail: "solovenko@leasing.corp.ru",
    contactPhone: "+73334445566",
    firstName: "Марина",
    lastName: "Соловенко",
    role: "Менеджер",
    surname: "Григорьевна",
  },
  {
    contactEmail: "popov@leasing.corp.ru",
    contactPhone: "+74445556677",
    firstName: "Геннадий",
    lastName: "Попов",
    role: "Старший менеджер",
    surname: "Федорович",
  },
];

export const mockUserData: IUserEntity[] = [
  {
    companyName: "ООО Авиасейлс",
    contactEmail: "pilot@aviasales.ru",
    contactPhone: "+72223334455",
    firstName: "Илья",
    lastName: "Пилот",
    surname: "Михайлович",
  },
  {
    companyName: "ОАО Мечты сбываются",
    contactEmail: "ivanova@mechta.ru",
    contactPhone: "+78889990011",
    firstName: "Светлана",
    lastName: "Иванова",
    surname: "Герасимовна",
  },
  {
    companyName: "ПАО 'Т Плюс'",
    contactEmail: "petrov@tplus.ru",
    contactPhone: "+79998886655",
    firstName: "Григорий",
    lastName: "Петров",
    surname: "Алексеевич",
  },
];
