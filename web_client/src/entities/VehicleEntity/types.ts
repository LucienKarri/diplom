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

export interface IVehicle {
  id?: number;
  year?: number;
  liftingCapacity?: number;
  length?: number;
  height?: number;
  width?: number;
  capacity?: number;
  enginePower?: number;
  torque?: number;
  brand?: IDictionaryShort | number;
  model?: IDictionaryShort | number;
  fuel?: IDictionary | number;
  transmission?: IDictionary | number;
  description?: string;
  attachment?: IFile | string;
  price?: number;
}
