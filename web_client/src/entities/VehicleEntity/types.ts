export interface IDictionaryShort {
  id: number;
  name: string;
}

export interface IDictionary extends IDictionaryShort {
  code: string;
}

export interface IFile {
  id: string;
  fileName: string;
  fileType: string;
}

export interface IVehicleEntity {
  id?: number;
  year?: number;
  liftingCapacity?: number;
  length?: number;
  height?: number;
  width?: number;
  capacity?: number;
  enginePower?: number;
  torque?: number;
  brandEntity?: IDictionaryShort | number;
  modelEntity?: IDictionaryShort | number;
  fuelEntity?: IDictionary | number;
  transmissionEntity?: IDictionary | number;
  description?: string;
  attachment?: IFile | string;
  price?: number;
}
