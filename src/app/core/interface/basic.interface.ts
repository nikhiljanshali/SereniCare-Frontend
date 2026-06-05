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
export interface StorageUserDetails {
  id: string
  firstName: string
  lastName: string
  workEmail: string
  phone: number
  role: string
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

export interface DoctorSlotConfiguration {
  success: boolean
  message: string
  data: DoctorSlotConfigurationData
}

export interface DoctorSlotConfigurationData {
  _id: string
  doctorId: string
  defaultSlotDuration: number
  maxDailyAppointments: number
  emergencyBufferSlots: number
  telemedicineEnabled: boolean
  telemedicineSlotsPerDay: string
  status: string
  effectiveFromDate: string
  createdAt: string
  updatedAt: string
  __v: number
}


export interface IDoctorAvailability {
  success: boolean;
  message: string;
  data: IDoctorAvailabilityDetails[];
}

export interface IDoctorAvailabilityDetails {
  _id: string;
  doctorId: string;
  dayOfWeek: string;
  isAvailable?: boolean;
  shifts: Shift[];
  appointmentTypes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IDoctorSlotsByDay {
  success: boolean
  message: string
  data: IDoctorSlotsByDayData
}
export interface IDoctorSlotsByDayData {
  dayOfWeek: string
  appointmentTypes: string[]
  shifts: Shift[]
  breakShifts: BreakShift[]
  slots: Slot[]
}
export interface Slot {
  startTime: string
  endTime: string
}
export interface Shift {
  isBreakTime?: boolean
  startTime: string
  endTime: string
  _id: string
}
export interface BreakShift {
  isBreakTime: boolean
  startTime: string
  endTime: string
  _id: string
}

export type IAvailableSlots = string[]



export interface IAppointment {
  success: boolean
  message: string
  data: IAppointmentDetails[]
}

export interface IAppointmentDetails {
  _id: string
  appointmentNumber: string
  doctorId: DoctorId
  patientId: PatientId
  appointmentDate: string
  dayOfWeek: string
  startTime: string
  endTime: string
  appointmentType: string
  consultationMode: string
  appointmentStatus: string
  bookingSource: string
  symptoms: string
  notes: string
  consultationFee: number
  paymentStatus: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface DoctorId {
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
  specializations: Specialization[]
  officeStatus: string
  experience: number
  officeNumber: number
  residentDoctor: boolean
  isDeleted: boolean
  qualifications: Qualification[]
  areaOfExpertise: AreaOfExpertise[]
  createdAt: string
  updatedAt: string
  __v: number
  dateOfJoin: string
}

export interface Specialization {
  name: string
  code: string
  _id: string
}

export interface Qualification {
  name: string
  _id: string
}

export interface AreaOfExpertise {
  name: string
  _id: string
}

export interface PatientId {
  emergencyContact: EmergencyContact
  _id: string
  authUserId: string
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  gender: string
  age: number
  phone: string
  email: string
  address: string
  country: string
  state: string
  city: string
  pincode: string
  patientCode: string
  aadhaarNumber: string
  status: string
  primaryDoctorId: string
  medicalHistories: string[]
  insuranceDetails: string[]
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface EmergencyContact {
  name: string
  relation: string
  phone: string
}


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



export interface IDoctorById {
  success: boolean
  data: IDoctorByIdData
}

export interface IDoctorByIdData {
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
  specializations: Specialization[]
  officeStatus: string
  experience: number
  officeNumber: number
  residentDoctor: boolean
  isDeleted: boolean
  qualifications: Qualification[]
  areaOfExpertise: AreaOfExpertise[]
  createdAt: string
  updatedAt: string
  __v: number
  dateOfJoin: string,
  joined: string,
}

export interface AuthUserId {
  _id: string
  firstName: string
  lastName: string
  workEmail: string
  phone: number
  password: string
  role: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Specialization {
  name: string
  code: string
  _id: string
}

export interface Clinic {
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
  specializations: Specialization2[]
  __v: number
  createdAt: string
  updatedAt: string
}

export interface Specialization2 {
  name: string
  code: string
  _id: string
}

export interface Qualification {
  name: string
  _id: string
}

export interface AreaOfExpertise {
  name: string
  _id: string
}

export interface IDoctorLeaveResponse {
  success: boolean
  message: string
  data: IDoctorLeaveData
}

export interface IDoctorLeaveData {
  message: string
  data: IDoctorLeaveDetails
}

export interface IDoctorLeaveDetails {
  doctorId: string
  leaveType: string
  leaveStartDate: string
  leaveEndDate: string
  leaveReason: string
  leaveStatus: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}



export interface IDoctorQualification {
  success: boolean
  message: string
  data: IDoctorQualificationData
}

export interface IDoctorQualificationData {
  message: string
  data: IDoctorQualificationDetails
}

export interface IDoctorQualificationDetails {
  doctorId: string
  degreeName: string
  specializations: string
  instituteName: string
  universityName: string
  startYear: number
  endYear: number
  grade: string
  achievement: string
  description: string
  educationType: string
  isCompleted: boolean
  displayOrder: number
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}



export interface IDoctorWorkExperience {
  success: boolean
  message: string
  data: IDoctorWorkExperienceDetails[]
}

export interface IDoctorWorkExperienceDetails {
  _id: string
  doctorId: string
  hospitalName: string
  designation: string
  employmentType: string
  department: string
  startDate: string
  endDate: string
  currentlyWorking: boolean
  location: string
  description: string
  achievements: string
  displayOrder: number
  createdAt: string
  updatedAt: string
  __v: number
}



export interface IDoctorCertifcicaion {
  success: boolean
  message: string
  data: IDoctorCertifcicaionDetails[]
}

export interface IDoctorCertifcicaionDetails {
  _id: string
  doctorId: string
  certificateName: string
  issuingBody: string
  certificateNumber: string
  issuedDate: string
  expiryDate?: string
  isLifetime: boolean
  status: string
  documentUrl: string
  remarks: string
  createdAt: string
  updatedAt: string
  __v: number
}


export interface IDoctorPublicaion {
  success: boolean
  message: string
  data: IDoctorPublicaionDetails[]
}

export interface IDoctorPublicaionDetails {
  _id: string
  doctorId: string
  title: string
  journalName: string
  publicationYear: number
  authorRole: string
  doi: string
  publicationUrl: string
  abstract: string
  createdAt: string
  updatedAt: string
  __v: number
}



export interface IPatients {
  message: string
  status: boolean
  data: IPatientsData[]
}

export interface IPatientsData {
  emergencyContact: EmergencyContact
  _id: string
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  gender: string
  age: number
  phone: string
  email: string
  address: string
  country: string
  state: string
  city: string
  pincode: string
  patientCode: string
  aadhaarNumber: string
  status: string
  primaryDoctorId: string
  medicalHistories: MedicalHistory[]
  insuranceDetails: InsuranceDetail[]
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface EmergencyContact {
  name: string
  relation: string
  phone: string
}

export interface MedicalHistory {
  lifestyle: Lifestyle
  _id: string
  patientId: string
  condition: string
  allergies: string[]
  medications: string[]
  surgeries: string[]
  familyHistory: string
  notes: string
  __v: number
  createdAt: string
  updatedAt: string
}

export interface Lifestyle {
  smoking: Smoking
  alcohol: Alcohol
  substanceUse: SubstanceUse
  activityLevel: string
  dietType: string
  exerciseFrequency: string
  sleepHours: number
  stressLevel: string
  caffeineIntake: string
  waterIntake: number
  occupationType: string
  hobbies: string[]
}

export interface Smoking {
  status: boolean
  frequency: string
  durationYears: number
}

export interface Alcohol {
  status: boolean
  frequency: string
}

export interface SubstanceUse {
  tobacco: boolean
  drugs: boolean
}

export interface InsuranceDetail {
  _id: string
  patientId: string
  providerName: string
  policyNumber: string
  policyHolderName: string
  coverageAmount: number
  coverageDetails: string
  validFrom: string
  status: string
  __v: number
  createdAt: string
  updatedAt: string
}
