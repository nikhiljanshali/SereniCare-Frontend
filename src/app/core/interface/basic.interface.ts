import { Roles } from "../enum/common.enum";

export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  phone: number;
  role: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  roles: Roles[];
  badgeKey?: string;      // name of a component property to read a live count from (e.g. 'patientCount')
  badgeStatic?: number;   // fixed badge value, when you don't need a live count
  badgeColor?: string;
  appendParam?: string;   // name of a component property to append to `route` at render time (e.g. doctorId)
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

export interface ISurgery {
  message: string
  status: boolean
  data: ISurgeryData[]
}

export interface ISurgeryData {
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
  groupname: string
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

export interface IDiseases {
  message: string
  status: boolean
  data: IDiseasesData[]
}

export interface IDiseasesData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
}


export interface ISurgery {
  message: string
  status: boolean
  data: ISurgeryData[]
}

export interface ISurgeryData {
  _id: string
  name: string
  code: string
  description: string
  __v: number
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
  clinicId?: string
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
  doctorDetails: any
  medicalHistories: MedicalHistory[]
  insuranceDetails: InsuranceDetail[]
  appointments: Appointment[]
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
  UHIDSequenceNo: string
}

export interface Appointment {
  _id: string
  appointmentNumber: string
  doctorId: DoctorId
  patientId: string
  clinicId: ClinicId
  appointmentDate: string
  dayOfWeek: string
  startTime: string
  endTime: string
  appointmentType: string
  consultationMode: string
  appointmentStatus: string
  bookingSource?: string
  symptoms: string
  notes: string
  consultationFee: number
  paymentStatus: string
  cancelledReason: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface DoctorId {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface ClinicId {
  _id: string
  address: string
  phone: number
}


export interface EmergencyContact {
  name: string
  relation: string
  phone: string
}

export interface MedicalHistory {
  _id: string
  lifestyle: Lifestyle
  patientId: string
  bloodGroup: string
  condition: string
  allergies: string[]
  medications: string[]
  surgeries: string[]
  familyHistory: string
  notes: string
  createdAt: string
  updatedAt: string
  __v: number
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
  validTo: string
  status: string
  __v: number
  createdAt: string
  updatedAt: string
}




export interface ISupplier {
  success: boolean
  message: string
  data: ISupplierDetails[]
}

export interface ISupplierDetails {
  _id: string
  authUserId: string
  supplierCode: string
  firstName: string
  lastName: string
  supplierType: string
  registrationNumber: string
  gstNumber: string
  panNumber: string
  drugLicenseNumber: string
  website: string
  email: string
  phoneNumber: string
  alternatePhoneNumber: string
  contacts: IContact[]
  billingAddress: IBillingAddress
  shippingAddress: IShippingAddress
  bankDetails: IBankDetails
  paymentTerms: string
  creditLimit: number
  openingBalance: number
  outstandingBalance: number
  suppliedCategories: string[]
  suppliedBrands: string[]
  rating: number
  status: string
  remarks: string
  documents: any[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IContact {
  contactPersonName: string
  designation: string
  mobileNumber: string
  alternateMobileNumber: string
  email: string
  isPrimary: boolean
}

export interface IBillingAddress {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface IShippingAddress {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface IBankDetails {
  bankName: string
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  branchName: string
  swiftCode: string
}


export interface IMedicine {
  success: boolean
  message: string
  count: number
  data: IMedicineDetails[]
}

export interface IMedicineDetails {
  _id: string
  medicineCode: string
  medicineName: string
  genericName: string
  brandName: string
  category: string
  therapeuticClass: string
  strength: string
  unit: string
  manufacturer: string
  supplierId: string
  hsnCode: string
  gstPercentage: number
  purchasePrice: number
  sellingPrice: number
  reorderLevel: number
  maxStockLevel: number
  storageCondition: string
  requiresPrescription: boolean
  isControlledDrug: boolean
  contraindications: string[]
  sideEffects: string[]
  drugInteractions: string[]
  dosageInstructions: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}


export interface IPrescriptions {
  status: boolean
  message: string
  count: number
  data: IPrescriptionsDetails[]
}

export interface IPrescriptionsDetails {
  _id: string
  prescriptionNumber: string
  appointmentId: Appointment
  patientId: string
  doctorId: string
  clinicId: string
  diagnosis: string[]
  symptoms: string[]
  medicines: IMedicine[]
  investigations: IInvestigation[]
  advice: string
  followUpDate: string
  notes: string
  status: string
  prescribedDate: string
  createdAt: string
  updatedAt: string
  patientDetails: PatientDetails
  doctorDetails: DoctorDetails
  clinicDetails: ClinicDetails
  __v: number
}

export interface ClinicDetails {
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

export interface PatientDetails {
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

export interface DoctorDetails {
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

export interface IMedicine {
  medicineName: string
  dosage: string
  dosageUnit: string
  frequency: string
  frequencyUnit: string
  duration: string
  durationType: string
  instructions: string
}

export interface IInvestigation {
  testName: string
  remarks: string
}




export interface IAppointmentLsit {
  _id: string
  appointmentNumber: string
  doctorId: DoctorId
  patientId: PatientId
  clinicId: string
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
  cancelledReason?: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IDoctorId {
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



export interface IChiefComplaint {
  success: boolean
  data: IChiefComplaintList[]
}

export interface IChiefComplaintList {
  _id: string
  doctorId: string
  patientId: string
  appointmentId: string
  complaint: string
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}


export interface IVitals {
  success: boolean
  data: IVitalsDetails[]
}

export interface IVitalsDetails {
  _id: string
  doctorId: string
  patientId: string
  appointmentId: string
  vitalDateTime: string
  description: string
  bloodPressure: string
  bloodPressureUnit: string
  temperature: number
  temperatureUnit: string
  respiratoryRate: number
  respiratoryRateUnit: string
  spO2: number
  spO2Unit: string
  weight: number
  weightUnit: string
  height: number
  heightUnit: string
  bmi: number
  bmiUnit: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IPastMedicalHistory {
  success: boolean
  data: IPastMedicalHistoryData
}

export interface IPastMedicalHistoryData {
  message: string
  data: IPastMedicalHistoryDetails[]
}

export interface IPastMedicalHistoryDetails {
  _id: string
  patientId: string
  problem: string
  status: string
  severity: string
  diagnosedBy: DiagnosedBy
  diagnosedDate: string
  ongoing: boolean
  endDate: any
  pastMedicalCode: string
  medications: Medication[]
  outcome: string
  historydocuments: any[]
  remark: string
  createdBy: CreatedBy
  createdAt: string
  updatedAt: string
  __v: number
}

export interface DiagnosedBy {
  _id: string
  email: string
  firstName: string
  lastName: string
}

export interface Medication {
  medicineName: string
  dosage: string
  dosageUnit: string
  frequency: string
  duration: string
  durationUnit: string
  _id: string
}

export interface CreatedBy {
  _id: string
}



export interface IPastSurgicalHistory {
  success: boolean
  data: IPastSurgicalHistoryData
}

export interface IPastSurgicalHistoryData {
  message: string
  data: IPastSurgicalHistoryDetails[]
}

export interface IPastSurgicalHistoryDetails {
  _id: string
  patientId: string
  surgeryName: string
  surgeryDate: string
  surgeonName: SurgeonName
  hospitalName: string
  remarks: string
  outcome: string
  complications: string
  complicationDetails: string
  anesthesiaType: string
  status: string
  createdBy: CreatedBy
  createdAt: string
  updatedAt: string
  __v: number
}

export interface SurgeonName {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface CreatedBy {
  _id: string
}


export interface IFamilyHistory {
  success: boolean
  data: IFamilyHistoryDetails
}

export interface IFamilyHistoryDetails {
  message: string
  data: IFamilyHistoryDetailsData[]
}

export interface IFamilyHistoryDetailsData {
  _id: string
  patientId: string
  noFamilyHistory: boolean
  problem: string
  father: boolean
  mother: boolean
  brother: boolean
  sister: boolean
  child: boolean
  paternal: boolean
  meternal: boolean
  comments: string
  createdBy: CreatedBy
  createdAt: string
  updatedAt: string
  __v: number
  updatedBy: UpdatedBy
}

export interface CreatedBy {
  _id: string
}

export interface UpdatedBy {
  _id: string
}



export interface IAllergiesHistory {
  success: boolean
  data: IAllergiesHistoryData
}

export interface IAllergiesHistoryData {
  message: string
  data: IAllergiesHistoryDetails[]
}

export interface IAllergiesHistoryDetails {
  _id: string
  patientId: string
  noKnownAllergies: boolean
  assesmentNotPossible: boolean
  comments: string
  allergies: string
  evaluation: string
  allergyType: string
  allergyGroup: string
  allergyReaction: string
  certainty: string
  serverity: string
  createdBy: CreatedBy
  createdAt: string
  updatedAt: string
  __v: number
  updatedBy: UpdatedBy
}

export interface CreatedBy {
  _id: string
}

export interface UpdatedBy {
  _id: string
}


export interface IPatientRisk {
  success: boolean
  data: IPatientRiskData
}

export interface IPatientRiskData {
  message: string
  data: IPatientRiskDetails[]
}

export interface IPatientRiskDetails {
  _id: string
  patientId: string
  riskCode: string
  riskDescription: string
  riskComment: string
  reportedOn: string
  createdBy: CreatedBy
  createdAt: string
  updatedAt: string
  __v: number
  updatedBy?: UpdatedBy
}

export interface CreatedBy {
  _id: string
}

export interface UpdatedBy {
  _id: string
}

export interface IAdverseDrugReaction {
  success: boolean
  data: IAdverseDrugReactionData
}

export interface IAdverseDrugReactionData {
  message: string
  data: IAdverseDrugReactionDetails[]
}

export interface IAdverseDrugReactionDetails {
  _id: string
  patientId: string
  subject: string
  medicineCode: string
  medicineName: string
  adrDetails: string
  adrDate: string
  ovrNumber: string
  createdBy: CreatedBy
  createdAt: string
  updatedAt: string
  __v: number
  updatedBy: UpdatedBy
}

export interface CreatedBy {
  _id: string
}

export interface UpdatedBy {
  _id: string
}

export interface IPhysicalExamination {
  success: boolean
  data: IPhysicalExaminationData[]
  message: string
}

export interface IPhysicalExaminationData {
  _id: string
  patientId: IPatientDetails
  generalSurvey: IGeneralSurvey[]
  cardiovascular: ICardiovascular[]
  respiratory: IRespiratory[]
  neurological: INeurological[]
  gastrointestinal: IGastrointestinal[]
  heent: IHeent[]
  genitourinary: IGenitourinary[]
  musculoskeletal: IMusculoskeletal[]
  skin: ISkin[]
  psychiatric: IPsychiatric[]
  createdAt: string
  updatedAt: string
  __v: number
}
export interface IPatientDetails {
  emergencyContact: IEmergencyContact
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
  UHIDSequenceNo: string
}
export interface IEmergencyContact {
  name: string
  relation: string
  phone: string
}
export interface IGeneralSurvey {
  painLevel: PainLevel
  generalAppearance: IGeneralAppearance
  patientId: string
  constitutionalState: string
  consciousness: string
  orientation: string
  nutritionalStatus: string
  hydrationStatus: string
  mobility: string
  gait: string
  distressLevel: string
  hygiene: string
  speech: string
  moodBehavior: string
  perfusion: string
  notes: string
  _id: string
  createdAt: string
  updatedAt: string
}
export interface PainLevel {
  score: number
  location: string
  character: string
}
export interface IGeneralAppearance {
  NORMAL: boolean
  ILL_LOOKING: boolean
  TOXIC_LOOKING: boolean
  DISTRESSED: boolean
  UNCONSCIOUS: boolean
  ALERT: boolean
  ALERT_ORIENTED: boolean
  DROWSY: boolean
  LETHARGIC: boolean
  RESTLESS: boolean
  AGITATED: boolean
  CONFUSED: boolean
  DEHYDRATED: boolean
  WELL_HYDRATED: boolean
  PALE: boolean
  CYANOSED: boolean
  JAUNDICED: boolean
  CACHECTIC: boolean
  OBESE: boolean
  UNDERWEIGHT: boolean
  WELL_NOURISHED: boolean
  MALNOURISHED: boolean
  FEBRILE: boolean
  DIAPHORETIC: boolean
  COMFORTABLE: boolean
  IN_PAIN: boolean
}
export interface ICardiovascular {
  patientId: string
  heartSoundAuscultation: string
  hsaNormalAbnormal: boolean
  heartSounds: string[]
  heartRhythm: string[]
  heartMurmurs: string[]
  heartRate: number
  peripheralPulsesPerfusion: string
  pppNormalAbnormal: boolean
  perfusionSide: string
  pppNormalValue: string[]
  pppAbNormalValue: string[]
  perfusionfindingNotes: string
  pulseQuality: string[]
  otherFindding: string[]
  radialPulse: number
  dorsalisPedisPulse: number
  postTibialPulse: number
  extremitiesDependentEdemaTracking: string
  edetNormalAbnormal: boolean
  edemaSide: string
  edemafindingNotes: string
  edemafindingGrade: string[]
  edemafindingLocation: string[]
  riskFindings: string[]
  _id: string
  createdAt: string
  updatedAt: string
}
export interface IRespiratory {
  patientId: string
  effertsNChestExpansion: string
  eceNormalAbnormal: boolean
  respatoryRate: number
  spo2: number
  symmetry: string[]
  effertsFindingNotes: string
  effertsNormal: string[]
  effertsIncreaseWorkOfBreathing: string[]
  chestWallAbnormality: string[]
  lungAuscultation: string
  laNormalAbnormal: boolean
  lungFindingsNotes: string
  upperLR: number
  midLR: number
  baseLR: number
  lungNormal: string[]
  adventitiousSounds: string[]
  airwayDiminished: string[]
  _id: string
  createdAt: string
  updatedAt: string
}
export interface INeurological {
  pathologicalReflexes: PathologicalReflexes
  patientId: string
  cranialNerves: string
  cnNormalAbnormal: boolean
  cranialNervesFindingNotes: string
  pupilsEyeMovements: string[]
  facialHearing: string[]
  palateSpeechNeck: string[]
  lateralizedFindings: LateralizedFinding[]
  mentalStatusOrientation: string
  msoNormalAbnormal: boolean
  levelConsciousness: string
  mentalOrientation: MentalOrientation[]
  mentalFindingNote: string
  mentalMoodBehavior: string[]
  mentalSpeech: string[]
  coordinationCerebellarFunction: string
  ccfNormalAbnormal: boolean
  gaitPattern: string
  gaitFindings: GaitFinding[]
  coordinationCerebellarFindingNotes: string
  rapidMovementsTremor: string[]
  motorStrengthMatrix: string
  msmNormalAbnormal: boolean
  glasgowComaScale: GlasgowComaScale[]
  muscleGroup: MuscleGroup[]
  msmFindingNotes: string
  toneDrift: string[]
  globalPatterns: string[]
  sensoryExam: string
  seNormalAbnormal: boolean
  sensoryExamination: SensoryExamination[]
  hemisensoryLoss: HemisensoryLoss[]
  sensoryFindingNote: string
  sensoryDistributionPattern: string[]
  deepTendonReflexes: string
  dtrNormalAbnormal: boolean
  reflexes: Reflex[]
  dtrFindingNotes: string
  _id: string
  createdAt: string
  updatedAt: string
}



export interface PathologicalReflexes {
  babinski: string
  sustainedClonus: string
  hoffmansSign: string
}

export interface LateralizedFinding {
  facialDroop: string
  uvulaDeviation: string
  tongueDeviation: string
  _id: string
}

export interface MentalOrientation {
  person: boolean
  place: boolean
  time: boolean
  situation: boolean
  _id: string
}

export interface GaitFinding {
  rombergTest: string
  tandemGait: string
  dysmetria: string
  abnormalHeelToShin: string
  _id: string
}

export interface GlasgowComaScale {
  eyeResponse: number
  verbalResponse: number
  motorResponse: number
  _id: string
}

export interface MuscleGroup {
  UpperExtL: number
  UpperExtR: number
  LowerExtL: number
  LowerExtR: number
  _id: string
}

export interface SensoryExamination {
  extremity: string
  lightTouch: string
  pinprick: string
  vibration: string
  proprioception: string
  _id: string
}

export interface HemisensoryLoss {
  hemisensoryLoss: string
  _id: string
}

export interface Reflex {
  biceps: number
  triceps: number
  brachioradialis: number
  patellarLeft: number
  patellarRight: number
  achillesLeft: number
  achillesRight: number
  _id: string
}
export interface IGastrointestinal {
  quadrantPercussionMap: QuadrantPercussionMap
  localizedSigns: LocalizedSigns
  herniaTypes: HerniaTypes
  scarLocation: ScarLocation
  patientId: string
  areDifferedNormal: string
  ppaNoFinding: boolean
  percussionAscitesAssessment: string
  paaNormalAbnormal: boolean
  findingsNotes: string
  ascitesSigns: string[]
  otherFindings: string[]
  ssNoFinding: boolean
  specialAbdominalSigns: string
  sasNormalAbnormal: boolean
  ssFindingNotes: string
  peritonealFindings: string[]
  hssNoFinding: boolean
  herniaSurgicalScars: string
  hssNormalAbnormal: boolean
  coughImpulse: string
  bowelSoundsatSite: string
  tenderness: string
  hssFindingNotes: string
  scarNoFinding: boolean
  scarCharacter: string[]
  woundConcerns: any[]
  scarFindingsNotes: string
  anorectalRectalExamination: string
  areNormalAbnormal: boolean
  sphincterTone: string
  grossBlood: string
  occultBloodTest: string
  externalInspection: string[]
  dreFindings: string[]
  prostateFindings: string[]
  areFindingsNotes: string
  reasonforDeferral: string
  _id: string
  createdAt: string
  updatedAt: string
}
export interface QuadrantPercussionMap {
  RUQ: string
  LUQ: string
  RLQ: string
  LLQ: string
}

export interface LocalizedSigns {
  reboundTenderness: string
  mcBurneyPointTenderness: string
  murphySign: string
  rovsingSign: string
  psoasSign: string
  obturatorSign: string
}

export interface HerniaTypes {
  inguinalHernia: string
  femoralHernia: string
  umbilicalHernia: string
  incisionalVentralHernia: string
}

export interface ScarLocation {
  RUQ: boolean
  LUQ: boolean
  RLQ: boolean
  LLQ: boolean
}

export interface IHeent {
  conjunctival: Conjunctival
  infection: Infection
  patientId: string
  headNoFinding: boolean
  headAssessment: string
  headNormalAbnormal: boolean
  eyesNoFinding: boolean
  eyesAssessment: string
  eyesNormalAbnormal: boolean
  eyesFindingsNotes: string
  pupilMovementChecklist: string[]
  eyesOtherFindings: string[]
  earsNoFinding: boolean
  earsAssessment: string
  earsNormalAbnormal: boolean
  earsFindingNotes: string
  earsOtherFindings: string[]
  noseNoFinding: boolean
  noseAssessment: string
  noseNormalAbnormal: boolean
  noseFindingNote: string
  epistaxis: string
  throatNoFinding: boolean
  throatAssessment: string
  throatNormalAbnormal: boolean
  throatFindingNotes: string
  tonsilSize: string
  _id: string
  createdAt: string
  updatedAt: string
}

export interface Conjunctival {
  redness: string
}

export interface Infection {
  earCanalInfection: string
  bulging: string
}
export interface IGenitourinary {
  dipstickParameters: DipstickParameters
  postVoidResidual: PostVoidResidual
  patientId: string
  urinaryAssessment: string
  uaNormalAbnormal: boolean
  symptomsChecklist: string[]
  bladderPalpationSuprapubic: string
  urinaryFindingNotes: string
  cvaAssessment: string
  caNormalAbnormal: boolean
  caRightCVA: string
  caLeftCVA: string
  kidneyPalpationFindings: string[]
  caFindingNotes: string
  reproductiveAssessment: string
  raNormalAbnormal: boolean
  raQuickSelectFindings: string[]
  raEstimatedSize: string
  raConsistency: string
  raPalpationInspection: string[]
  raTransillumination: string
  pcuColor: string
  pcuClarity: string
  pcuSpecificGravity: string
  urineCultureSensitivityOrdered: string
  _id: string
  createdAt: string
  updatedAt: string
}

export interface DipstickParameters {
  leukocytes: string
  nitrites: string
  protein: string
  glucose: string
  rbcBlood: string
  ketones: string
}

export interface PostVoidResidual {
  volume: number
  indwellingCatheterPresent: boolean
  catheterTypeAndSize: string
  urineOutputCharacter: string
  bedsideUltrasoundFindings: string
}
export interface IMusculoskeletal {
  patientId: string
  spineAssessment: string
  saNormalAbnormal: boolean
  regionsExamined: string[]
  cervicalMotion: string
  lumbarMotion: string
  specialTest: string[]
  upperExtremityAssessment: string
  ueaNormalAbnormal: boolean
  upperJointsRegionsExamined: string[]
  rotatorCuffShoulderProvocative: string[]
  elbowHandNerveTests: string[]
  lowerExtremityAssessment: string
  leaNormalAbnormal: boolean
  lowerJointsRegionsExamined: string[]
  kneeInstabilityMeniscalTests: string[]
  hipFootVascularTests: string[]
  _id: string
  createdAt: string
  updatedAt: string
}

export interface ISkin {
  patientId: string
  integrityAssessment: string
  iaNormalAbnormal: boolean
  primaryLocationSite: any[]
  pressureInjuryStaging: string
  vascularAssessment: string
  vaNormalAbnormal: boolean
  peripheralEdemaGrade: string
  capillaryRefillTime: string
  appendageAssessment: string
  aaNormalAbnormal: boolean
  nailBedAngle: string
  hairDistribution: string
  lesionsMoles: any[]
  dermatoscopy: string
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IPsychiatric {
  patientId: string
  behaviorAssessment: string
  baNormalAbnormal: boolean
  statedMood: string
  observedAffect: string
  thoughtAssessment: string
  taNormalAbnormal: boolean
  safetyRiskAssessment: any[]
  cognitionAssessment: string
  caNormalAbnormal: boolean
  orientationDomains: any[]
  diagnosticImpression: string
  immediateDisposition: string
  safetyPlan: string
  _id: string
  createdAt: string
  updatedAt: string
}
export interface GeneralAppearanceList {
  id: number
  code: string
  name: string
}

export interface IChiefComplaint {
  _id: string
  doctorId: string
  patientId: string
  appointmentId: string
  complaint: string
  duration: string
  onset: string
  severity: string
  associatedSymptoms: string[]
  patientStatement: string
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IPresetIllness {
  _id: string
  doctorId: string
  patientId: string
  appointmentId: string
  complaint: string
  historyOfPresentIllness: string
  onset: string
  location: string
  duration: string
  character: string
  severity: string
  radiation: string
  timing: string
  aggravatingFactors: string[]
  relievingFactors: string[]
  associatedSymptoms: string[]
  progression: string
  previousEpisodes: string
  treatmentsTried: string
  responseToTreatment: string
  additionalNotes: string
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}



export interface CountMaster {
  success: boolean
  message: string
  data: CountData
}

export interface CountData {
  doctorCount: number
  patientCount: number
  supplierCount: number
  medicineCount: number
  appointmentCount: number
  ChiefofcomplaintsCount: number
  PresentIllnessCount: number
  PastMedicalHistoryCount: number
  PastSurgicalHistoryCount: number
  FamilyHistoryCount: number
  AllergyHistoryCount: number
  RiskFactorCount: number
  AdverseDrugReactionCount: number
  FamilyHistoryLineageCount: number
}


export interface SymptomCategory {
  category: string;
  symptoms: string[];
}

export interface IClinicStamp {
  _id?: string;
  clinicId: string;
  doctorId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileData: string; // Base64 encoded file data
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClinicStampResponse {
  message: string;
  status: boolean;
  data?: IClinicStamp | IClinicStamp[];
}
