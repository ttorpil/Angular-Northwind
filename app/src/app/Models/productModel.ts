import { IBaseModel } from '.';

export interface IProductModel extends IBaseModel {
  supplierID?: number;
  categoryID?: number;
  quantityPerUnit: string;
  unitPrice: number;
  unitsInStock: number;
  discontinued: boolean;
  name: string;
}
