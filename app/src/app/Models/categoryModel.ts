import { IBaseModel } from ".";

export interface ICategoryModel extends IBaseModel{
    id: number;
    description: string;
    name: string;
  }