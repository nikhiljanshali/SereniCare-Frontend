export interface IDoctors {
  message: string
  status: boolean
  data: IDoctorsData[]
}

export interface IDoctorsData {
  _id: string
  authUserId: string
  doctorCode: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  age: number
  phone: string
  email: string
  address: string
  city: string
  state: string
  country: string
  pincode: string
  aadhaarNumber: string
  licenseNumber: string
  status: string
  specializations: ISpecialization[]
  createdAt: string
  updatedAt: string
  __v: number
  clinicDetails: IClinicDetail[]
}

export interface IClinicDetail {
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
  specializations: ISpecialization[]
  __v: number
  createdAt: string
  updatedAt: string
}

export interface ISpecialization {
  name: string
  code: string
  _id: string
}


export interface ILimitedDoctors {
  message: string
  status: boolean
  data: ILimitedDocotorsData[]
}

export interface ILimitedDocotorsData {
  _id: string
  firstName: string
  lastName: string
}
