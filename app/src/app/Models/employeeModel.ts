import { IBaseModel } from '.';

export interface IEmployeeModel extends IBaseModel {
  id: number;
  lastName: string;
  firstName: string;
  title: string;
  titleOfCourtesy: string;
  birthDate: Date;
  hireDate: Date;
  address: string;
  notes: string;
  reportsTo: number;
  territoryIDs: Array<number>;
}
