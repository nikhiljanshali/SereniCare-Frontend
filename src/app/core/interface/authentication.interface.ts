export interface SignupResponse {
  firstName: string;
  lastName: string;
  role: string;
  // add other fields from API if needed
}


export interface SigninResponse {
  user: UserDetails;
  token: string;
  clinic: Clinic
}


export interface UserDetails {
  id: string
  firstName: string
  lastName: string
  workEmail: string
  phone: number
  role: string
}

export interface Clinic {
  id: string
  clinicName: string
  registrationNumber: string
  clinicType: string
}


export interface UserDetails {
  id: string
  firstName: string
  lastName: string
  workEmail: string
  phone: number
  role: string
}
