import { IUserInfo } from "../../shared/providers/UserProvider/UserProvider";

interface IStatus {
  id: number;
  code: "CREATE" | "PROGRESS" | "CLOSED";
  name: string;
}

export interface IRequestEntity extends IUserInfo {
  request_id: string;
  createdDate: string;
  lastUpdatedDate: string | null;
  status: IStatus;
}

export interface IRequestEntityResponse {
  id: string;
  createdDate: string;
  lastUpdatedDate: string | null;
  status: IStatus;
  createBy: IUserInfo;
}
