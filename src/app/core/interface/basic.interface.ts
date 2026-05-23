import { Roles } from "../enum/common.enum";

// export interface MenuItem {
//   id: string;
//   label: string;
//   icon: string;
//   badge?: number | (() => string);
//   badgeColor?: string;
//   children?: MenuItem[];
// }

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  badge?: any;
  badgeColor?: string;
  roles?: string[];
  children?: MenuItem[];
}

export interface IClinicType {
  message: string
  status: boolean
  data: IClinicTypeData[]
}

export interface IClinicTypeData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
}

export interface IPrimarySpeciality {
  message: string
  status: boolean
  data: IPrimarySpecialityData[]
}

export interface IPrimarySpecialityData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
}

export interface IRole {
  message: string
  status: boolean
  data: IRoleData[]
}

export interface IRoleData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
}

export interface IBloodGroup {
  message: string
  status: boolean
  data: IBloodGroupData[]
}

export interface IBloodGroupData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
}

export interface IPrimaryCondition {
  message: string
  status: boolean
  data: IPrimaryConditionData[]
}

export interface IPrimaryConditionData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
}


export interface IBloodGroup {
  message: string
  status: boolean
  data: IBloodGroupData[]
}

export interface IBloodGroupData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
}

export interface IPrimaryCondition {
  message: string
  status: boolean
  data: IPrimaryConditionData[]
}

export interface IPrimaryConditionData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
}

export interface IAllergies {
  message: string
  status: boolean
  data: IAllergiesData[]
}

export interface IAllergiesData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
}

export interface ICity {
  id: number;
  name: string;
}

export interface IState {
  id: number;
  name: string;
  code: string;
  cities: ICity[];
}

export interface ICountry {
  id: number;
  name: string;
  code: string;
  states: IState[];
}

export interface LocationData {
  countries: ICountry[];
}

export interface CascadeSelection {
  country: ICountry | null;
  state: IState | null;
  city: ICity | null;
}



export interface IClinics {
  message: string
  status: boolean
  data: IClinicList[]
}

export interface IClinicList {
  _id: string
  doctorId: string
  clinicName: string
  registrationNumber: string
  clinicType: string
  address: string
  city: string
  pincode: number
  phone: number
  clinicEmail: string
  specializations: Specialization[]
  __v: number
  createdAt: string
  updatedAt: string
}

export interface Specialization {
  name: string
  code: string
  _id: string
}
