// =========================
// 🔹 STATUS FLAGS
// =========================
export enum StatusFlags {
  Success = 1,
  Failed = 2,
  AlreadyExists = 3,
  DependencyExists = 4,
  Warning = 5,
  Info = 6
}

// =========================
// 🔹 MESSAGE TYPE
// =========================
export enum eMessageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}

// =========================
// 🔹 MESSAGE ICON
// =========================
export enum eMessageIcon {
  Success = 'check_circle',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}

// =========================
// 🔹 User Types
// =========================
export enum UserTypes {
  Doctor = 'Doctor',
  Patient = 'Patient',
}

export enum Roles {
  SystemAdmin = 'System Admin',
  Admin = 'Admin',
  Doctor = 'Doctor',
  Patient = 'Patient',
  Supplier = 'Supplier'
}



export enum RightSideComponentName{
  $Patient = 'Patient',
  $Doctor = 'Doctor',
  $EditAppointment = 'Edit Appointment'
}