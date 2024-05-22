export interface IDealingEntity {
  id?: number;
  user: string;
  request: string;
  vehicle: string;
  payment: number;
  amount: number;
  dateOfStart: string;
  dateOfEnd: string;
  status: string;
  contactPhone: string;
  contactEmail: string;
  companyName: string;
  file: string;
}
