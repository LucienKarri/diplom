import { IUserInfo } from "../../shared/providers/UserProvider/UserProvider";
import { IFile, IVehicleEntity } from "../VehicleEntity/types";

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
  status: IStatus | number;
  createBy: IUserInfo | string;

  vehicle: IVehicleEntity | number;
  amountOfCredit?: number;
  creditTerm: number;
  paymentDay: number;
  monthlyPayment?: number;
  advancePayment: number;
  attachment?: IFile | string;
  companyAdress?: string;
}
