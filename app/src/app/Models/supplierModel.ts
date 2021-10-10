import { IAddressModel, IBaseModel } from '.';

export interface ISupplierModel extends IBaseModel {
  id: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: IAddressModel;
}
