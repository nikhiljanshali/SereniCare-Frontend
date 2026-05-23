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
