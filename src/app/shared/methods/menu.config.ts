import { Roles } from "../../core/enum/common.enum";

/**
 * MenuItem is intentionally pure data (no functions) so MENU_CONFIG below
 * can be treated as a JSON object — you could move it to menu.config.json
 * verbatim if you prefer, since Roles values are just strings under the hood.
 */
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  roles: Roles[];
  children?: MenuItem[];
  badge?: any;
  badgeKey?: string;
  badgeStatic?: number;
  badgeColor?: string;
  appendParam?: string;
}

export interface MenuGroupItem extends MenuItem {
  group: string;
}

/**
 * Single source of truth for the entire sidebar, across every role.
 * To add a new top-level item: push another object here.
 * To add a submenu: add a `children` array to any item (works at any depth).
 * To restrict visibility: set `roles` on the item itself, and/or on individual children.
 */
export const MENU_CONFIG: MenuItem[] = [
  // ---------------------------------------------------------------------
  // System Admin
  // ---------------------------------------------------------------------
  {
    id: 'patient',
    label: 'Patients',
    icon: 'bi-people',
    badgeKey: 'patientCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'list', label: 'Patient List', icon: 'bi-person-lines-fill', route: 'patients/master/list', roles: [Roles.SystemAdmin] },
      { id: 'register', label: 'Register Patient', icon: 'bi-person-plus', route: 'patients/master/registration', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'doctor',
    label: 'Doctors',
    icon: 'bi-people',
    badgeKey: 'doctorCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'clinic', label: 'Clinic List', icon: 'bi-hospital-fill', route: 'doctors/master/clinics', roles: [Roles.SystemAdmin] },
      { id: 'doctor-list', label: 'Doctor Detail View', icon: 'bi-person-lines-fill', route: 'doctors/master/doctor-list', roles: [Roles.SystemAdmin] },
      { id: 'list', label: 'Doctor List', icon: 'bi-person-lines-fill', route: 'doctors/master/list', roles: [Roles.SystemAdmin] },
      { id: 'register', label: 'Register Doctor', icon: 'bi-person-plus', route: 'doctors/master/registration', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'nurse',
    label: 'Nurse',
    icon: 'bi-person-hearts',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin, Roles.Nurse],
    children: [
      { id: 'list', label: 'Nurse List', icon: 'bi-person-lines-fill', route: 'nurse/master/list', roles: [Roles.SystemAdmin, Roles.Nurse] },
      { id: 'register', label: 'Register Nurse', icon: 'bi-person-plus', route: 'nurse/master/registration', roles: [Roles.SystemAdmin, Roles.Nurse] }
    ]
  },
  {
    id: 'appointments-admin',
    label: 'Appointments',
    icon: 'bi-calendar2-check',
    badgeKey: 'appointmentCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'calendar', label: 'Calendar View', icon: 'bi-calendar3', route: 'doctors/master/doctor-appointments', roles: [Roles.SystemAdmin] },
      { id: 'all', label: 'All Appointments', icon: 'bi-list-ul', route: 'appointments/master/list', roles: [Roles.SystemAdmin] },
      { id: 'book', label: 'Book Appointment', icon: 'bi-plus-circle', route: 'doctors/master/book-appointments', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'prescriptions-admin',
    label: 'Prescriptions',
    icon: 'bi-prescription',
    badgeStatic: 3,
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'all', label: 'All Prescriptions', icon: 'bi-list-check', route: 'prescription/master/list', roles: [Roles.SystemAdmin] }
      // 'new' / 'refill' children were commented out in the original — add them back here when ready:
      // { id: 'new', label: 'New Prescription', icon: 'bi-clipboard-plus', route: 'prescription/master/create', roles: [Roles.SystemAdmin] },
      // { id: 'refill', label: 'Refill Requests', icon: 'bi-repeat', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'supplier',
    label: 'Supplier',
    icon: 'bi-person-circle',
    badgeKey: 'supplierCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'supplierlist', label: 'Supplier List', icon: 'bi-person-lines-fill', route: 'supplier/master/list', roles: [Roles.SystemAdmin] },
      { id: 'supplieregister', label: 'Register Supplier', icon: 'bi-person-fill-add', route: 'supplier/master/registration', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'medicine',
    label: 'Medicine',
    icon: 'bi-capsule-pill',
    badgeKey: 'medicineCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      // NOTE: originally all three of these shared the id 'addmedicine' — gave each a unique id
      { id: 'medicine-add', label: 'Add Medicine', icon: 'bi-bag-plus-fill', route: 'medicine/master/add', roles: [Roles.SystemAdmin] },
      { id: 'medicine-list', label: 'Medicine List', icon: 'bi-bag-plus-fill', route: 'medicine/master/list', roles: [Roles.SystemAdmin] },
      { id: 'medicine-import', label: 'Import Medicine', icon: 'bi-bag-plus-fill', route: 'medicine/master/import', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'services',
    label: 'Services',
    icon: 'bi-list-task',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      // NOTE: originally all three of these shared the id 'addmedicine' — gave each a unique id
      { id: 'ser-dashboard', label: 'Dashboard', icon: 'bi-speedometer2', route: 'medical-services/master/dashboard', roles: [Roles.SystemAdmin] },
    ]
  },
  {
    id: 'facility',
    label: 'Facility',
    icon: 'bi-box2-heart-fill',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      // NOTE: originally all three of these shared the id 'addmedicine' — gave each a unique id
      { id: 'ser-dashboard', label: 'Dashboard', icon: 'bi-speedometer2', route: 'facility/master/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'ser-wingsNbeds', label: 'Wings & Beds', icon: 'bi bi-building', route: 'facility/master/wingbeds', roles: [Roles.SystemAdmin] },
      // { id: 'ser-master-facilities', label: 'Create', icon: 'bi-bag-plus-fill', route: 'facility/master/create', roles: [Roles.SystemAdmin] },
      // { id: 'ser-master-facilities-list', label: 'List', icon: 'bi-bag-plus-fill', route: 'facility/master/list', roles: [Roles.SystemAdmin] },
      // { id: 'ser-typecreate', label: 'Create Master FT', icon: 'bi-bag-plus-fill', route: 'facility/master/create-facility-type', roles: [Roles.SystemAdmin] },
      // { id: 'ser-typelist', label: 'Master FT List', icon: 'bi-bag-plus-fill', route: 'facility/master/facility-type-list', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'outpatient',
    label: 'OPD / Outpatient',
    icon: 'bi-person-walking',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'opd-dashboard', label: 'OPD Dashboard', icon: 'bi-speedometer2', route: 'opd/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'opd-registration', label: 'OPD Registration', icon: 'bi-person-plus-fill', route: 'opd/registration', roles: [Roles.SystemAdmin] },
      { id: 'opd-appointment-queue', label: 'Appointment / Queue', icon: 'bi-calendar-check-fill', route: 'opd/appointment-queue', roles: [Roles.SystemAdmin] },
      { id: 'opd-consultation', label: 'Consultation', icon: 'bi-chat-left-text-fill', route: 'opd/consultation', roles: [Roles.SystemAdmin] },
      { id: 'opd-vital-signs', label: 'Vital Signs', icon: 'bi-activity', route: 'opd/vital-signs', roles: [Roles.SystemAdmin] },
      { id: 'opd-medical-history', label: 'Medical History', icon: 'bi-file-earmark-medical-fill', route: 'opd/medical-history', roles: [Roles.SystemAdmin] },
      { id: 'opd-physical-examination', label: 'Physical Examination', icon: 'bi-body-text', route: 'opd/physical-examination', roles: [Roles.SystemAdmin] },
      { id: 'opd-diagnosis', label: 'Diagnosis', icon: 'bi-clipboard2-pulse-fill', route: 'opd/diagnosis', roles: [Roles.SystemAdmin] },
      { id: 'opd-prescription', label: 'Prescription', icon: 'bi-capsule', route: 'opd/prescription', roles: [Roles.SystemAdmin] },
      { id: 'opd-lab-orders', label: 'Lab Orders', icon: 'bi-journal-medical', route: 'opd/lab-orders', roles: [Roles.SystemAdmin] },
      { id: 'opd-radiology-orders', label: 'Radiology Orders', icon: 'bi-border-style', route: 'opd/radiology-orders', roles: [Roles.SystemAdmin] },
      { id: 'opd-procedures', label: 'Procedures', icon: 'bi-bandaid-fill', route: 'opd/procedures', roles: [Roles.SystemAdmin] },
      { id: 'opd-follow-up', label: 'Follow-Up', icon: 'bi-arrow-repeat', route: 'opd/follow-up', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'inpatient',
    label: 'IPD / Inpatient',
    icon: 'bi-hospital',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'ipd-admission', label: 'Admission', icon: 'bi-person-plus-fill', route: 'ipd/admission', roles: [Roles.SystemAdmin] },
      { id: 'ipd-bed-management', label: 'Bed Management', icon: 'bi-door-closed-fill', route: 'ipd/bed-management', roles: [Roles.SystemAdmin] },
      { id: 'ipd-ward-management', label: 'Ward Management', icon: 'bi-building-gear', route: 'ipd/ward-management', roles: [Roles.SystemAdmin] },
      { id: 'ipd-inpatient-dashboard', label: 'Inpatient Dashboard', icon: 'bi-speedometer2', route: 'ipd/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'ipd-doctor-visits', label: 'Doctor Visits', icon: 'bi-person-badge-fill', route: 'ipd/doctor-visits', roles: [Roles.SystemAdmin] },
      { id: 'ipd-nursing-care', label: 'Nursing Care', icon: 'bi-heart-pulse-fill', route: 'ipd/nursing-care', roles: [Roles.SystemAdmin] },
      { id: 'ipd-vital-signs', label: 'Vital Signs', icon: 'bi-activity', route: 'ipd/vital-signs', roles: [Roles.SystemAdmin] },
      { id: 'ipd-nursing-assessment', label: 'Nursing Assessment', icon: 'bi-clipboard-check-fill', route: 'ipd/nursing-assessment', roles: [Roles.SystemAdmin] },
      { id: 'ipd-medication-administration', label: 'Medication Administration', icon: 'bi-capsule', route: 'ipd/medication-administration', roles: [Roles.SystemAdmin] },
      { id: 'ipd-doctor-orders', label: 'Doctor Orders', icon: 'bi-file-earmark-medical-fill', route: 'ipd/doctor-orders', roles: [Roles.SystemAdmin] },
      { id: 'ipd-lab-orders', label: 'Lab Orders', icon: 'bi-journal-medical', route: 'ipd/lab-orders', roles: [Roles.SystemAdmin] },
      { id: 'ipd-radiology', label: 'Radiology', icon: 'bi-border-style', route: 'ipd/radiology', roles: [Roles.SystemAdmin] },
      { id: 'ipd-procedures', label: 'Procedures', icon: 'bi-bandaid-fill', route: 'ipd/procedures', roles: [Roles.SystemAdmin] },
      { id: 'ipd-progress-notes', label: 'Progress Notes', icon: 'bi-journal-text', route: 'ipd/progress-notes', roles: [Roles.SystemAdmin] },
      { id: 'ipd-care-plan', label: 'Care Plan', icon: 'bi-card-checklist', route: 'ipd/care-plan', roles: [Roles.SystemAdmin] },
      { id: 'ipd-patient-transfer', label: 'Patient Transfer', icon: 'bi-arrow-left-right', route: 'ipd/patient-transfer', roles: [Roles.SystemAdmin] },
      { id: 'ipd-discharge', label: 'Discharge', icon: 'bi-box-arrow-right', route: 'ipd/discharge', roles: [Roles.SystemAdmin] },
      { id: 'ipd-discharge-summary', label: 'Discharge Summary', icon: 'bi-file-earmark-text-fill', route: 'ipd/discharge-summary', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'emergency',
    label: 'Emergency',
    icon: 'bi-hospital-fill',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'er-dashboard', label: 'Emergency Dashboard', icon: 'bi-speedometer2', route: 'emergency/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'er-triage', label: 'Triage', icon: 'bi-exclamation-triangle-fill', route: 'emergency/triage', roles: [Roles.SystemAdmin] },
      { id: 'er-registration', label: 'ER Registration', icon: 'bi-person-plus-fill', route: 'emergency/registration', roles: [Roles.SystemAdmin] },
      { id: 'er-active-cases', label: 'Active Cases', icon: 'bi-activity', route: 'emergency/active-cases', roles: [Roles.SystemAdmin] },
      { id: 'er-discharge-transfer', label: 'Discharge / Transfer', icon: 'bi-box-arrow-right', route: 'emergency/discharge-transfer', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy',
    icon: 'bi-capsule-pill',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'pharma-dashboard', label: 'Pharmacy Dashboard', icon: 'bi-speedometer2', route: 'pharmacy/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'pharma-dispensing', label: 'Medication Dispensing', icon: 'bi-box-seam-fill', route: 'pharmacy/dispensing', roles: [Roles.SystemAdmin] },
      { id: 'pharma-inventory', label: 'Inventory Management', icon: 'bi-boxes', route: 'pharmacy/inventory', roles: [Roles.SystemAdmin] },
      { id: 'pharma-prescriptions', label: 'Prescriptions', icon: 'bi-file-earmark-medical-fill', route: 'pharmacy/prescriptions', roles: [Roles.SystemAdmin] },
      { id: 'pharma-purchase-orders', label: 'Purchase Orders', icon: 'bi-cart-check-fill', route: 'pharmacy/purchase-orders', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'laboratory',
    label: 'Laboratory',
    icon: 'bi-journal-medical',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'lab-dashboard', label: 'Lab Dashboard', icon: 'bi-speedometer2', route: 'laboratory/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'lab-sample-collection', label: 'Sample Collection', icon: 'bi-droplet-fill', route: 'laboratory/sample-collection', roles: [Roles.SystemAdmin] },
      { id: 'lab-test-requests', label: 'Test Requests', icon: 'bi-clipboard-pulse', route: 'laboratory/test-requests', roles: [Roles.SystemAdmin] },
      { id: 'lab-results-entry', label: 'Results Entry', icon: 'bi-pencil-square', route: 'laboratory/results-entry', roles: [Roles.SystemAdmin] },
      { id: 'lab-reports', label: 'Lab Reports', icon: 'bi-file-earmark-spreadsheet-fill', route: 'laboratory/reports', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'radiology',
    label: 'Radiology',
    icon: 'bi-border-style',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'rad-dashboard', label: 'Radiology Dashboard', icon: 'bi-speedometer2', route: 'radiology/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'rad-order-list', label: 'Order List', icon: 'bi-card-checklist', route: 'radiology/order-list', roles: [Roles.SystemAdmin] },
      { id: 'rad-scheduling', label: 'Imaging Scheduling', icon: 'bi-calendar-event-fill', route: 'radiology/scheduling', roles: [Roles.SystemAdmin] },
      { id: 'rad-results-entry', label: 'Report Entry', icon: 'bi-file-earmark-richtext-fill', route: 'radiology/report-entry', roles: [Roles.SystemAdmin] },
      { id: 'rad-pacs-viewer', label: 'PACS Viewer Integration', icon: 'bi-display-fill', route: 'radiology/pacs-viewer', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: 'bi-receipt-cutoff',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'bill-dashboard', label: 'Billing Dashboard', icon: 'bi-speedometer2', route: 'billing/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'bill-invoices', label: 'Invoices', icon: 'bi-receipt', route: 'billing/invoices', roles: [Roles.SystemAdmin] },
      { id: 'bill-payments', label: 'Payments & Receipts', icon: 'bi-credit-card-fill', route: 'billing/payments', roles: [Roles.SystemAdmin] },
      { id: 'bill-service-tariffs', label: 'Service Tariffs', icon: 'bi-tags-fill', route: 'billing/service-tariffs', roles: [Roles.SystemAdmin] },
      { id: 'bill-refunds', label: 'Refunds & Adjustments', icon: 'bi-arrow-counterclockwise', route: 'billing/refunds', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: 'bi-shield-check',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'ser-dashboard', label: 'Insurance Dashboard', icon: 'bi-speedometer2', route: 'insurance-tpa/master/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'ins-claims', label: 'Claims Management', icon: 'bi-file-earmark-check-fill', route: 'insurance/claims', roles: [Roles.SystemAdmin] },
      { id: 'ins-pre-authorization', label: 'Pre-Authorization', icon: 'bi-key-fill', route: 'insurance/pre-authorization', roles: [Roles.SystemAdmin] },
      { id: 'ins-providers', label: 'Insurance Providers / TPAs', icon: 'bi-building', route: 'insurance/providers', roles: [Roles.SystemAdmin] },
      { id: 'ins-settlements', label: 'Settlements', icon: 'bi-cash-stack', route: 'insurance/settlements', roles: [Roles.SystemAdmin] }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'bi-bar-chart-line-fill',
    badgeKey: 'serviceCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.SystemAdmin],
    children: [
      { id: 'rep-dashboard', label: 'Reports Dashboard', icon: 'bi-speedometer2', route: 'reports/dashboard', roles: [Roles.SystemAdmin] },
      { id: 'rep-clinical', label: 'Clinical Reports', icon: 'bi-file-earmark-medical', route: 'reports/clinical', roles: [Roles.SystemAdmin] },
      { id: 'rep-financial', label: 'Financial Reports', icon: 'bi-graph-up-arrow', route: 'reports/financial', roles: [Roles.SystemAdmin] },
      { id: 'rep-operational', label: 'Operational Reports', icon: 'bi-gear-wide-connected', route: 'reports/operational', roles: [Roles.SystemAdmin] },
      { id: 'rep-audit-logs', label: 'Audit Logs', icon: 'bi-journal-text', route: 'reports/audit-logs', roles: [Roles.SystemAdmin] }
    ]
  },

  // ---------------------------------------------------------------------
  // Doctor
  // ---------------------------------------------------------------------
  {
    id: 'doctors-management',
    label: 'Doctor Management',
    icon: 'bi-people',
    badgeKey: 'doctorCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.Doctor],
    children: [
      { id: 'profile', label: 'Profile', icon: 'bi-person', route: 'doctors/master/doctor-profile/', appendParam: 'doctorId', roles: [Roles.Doctor] },
      // FIXED: this was roles: [Roles.SystemAdmin] in the original, which meant doctors never saw it
      { id: 'book', label: 'Book Appointment', icon: 'bi-plus-circle', route: 'doctors/master/book-appointments', roles: [Roles.Doctor] },
      { id: 'doctor-clinics', label: 'Clinics', icon: 'bi-hospital-fill', route: 'doctors/master/clinics', roles: [Roles.Doctor] }
    ]
  },
  {
    id: 'appointments-doctor',
    label: 'Appointments',
    icon: 'bi-calendar2-check',
    badgeStatic: 0,
    roles: [Roles.Doctor],
    children: [
      // FIXED: this was roles: [Roles.SystemAdmin] in the original — same bug as above
      { id: 'calendar', label: 'Calendar View', icon: 'bi-calendar3', route: 'doctors/master/doctor-appointments', roles: [Roles.Doctor] }
    ]
  },
  {
    id: 'patient-doctor',
    label: 'Patients',
    icon: 'bi-people',
    badgeKey: 'patientCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.Doctor],
    children: [
      { id: 'list', label: 'Patient List', icon: 'bi-person-lines-fill', route: 'patients/master/list', roles: [Roles.Doctor] }
    ]
  },
  {
    id: 'prescriptions-doctor',
    label: 'Prescriptions',
    icon: 'bi-prescription',
    badgeStatic: 3,
    roles: [Roles.Doctor],
    children: [
      { id: 'all', label: 'All Prescriptions', icon: 'bi-list-check', route: 'prescription/master/list', roles: [Roles.Doctor] },
      { id: 'refill', label: 'Refill Requests', icon: 'bi-repeat', roles: [Roles.Doctor] }
      // 'new' was commented out in the original — add back when ready:
      // { id: 'new', label: 'New Prescription', icon: 'bi-clipboard-plus', route: 'prescription/master/create', roles: [Roles.Doctor] }
    ]
  },
  // ---------------------------------------------------------------------
  // Patient
  // ---------------------------------------------------------------------
  {
    id: 'patients-management',
    label: 'Patient Mgt.',
    icon: 'bi-people',
    badgeKey: 'patientCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.Patient],
    children: [
      { id: 'patient-profile', label: 'Patient Profile', icon: 'bi-person', route: 'patients/master/profile', roles: [Roles.Patient] },
      // FIXED: this was roles: [Roles.SystemAdmin] in the original, which meant doctors never saw it
      { id: 'book-appointment', label: 'Book Appointment', icon: 'bi-plus-circle', route: 'patients/master/bookappointment', roles: [Roles.Patient] },
      { id: 'patient-calender-view', label: 'Appointment Calender', icon: 'bi-plus-circle', route: 'patients/master/calender-view', roles: [Roles.Patient] },
      { id: 'visit-history', label: 'Visit History', icon: 'bi-clock-history', route: '', roles: [Roles.Patient] },
      { id: 'documents-vault', label: 'Dodcument Vault', icon: 'bi-folder-symlink', route: '', roles: [Roles.Patient] }
    ]
  },
  {
    id: 'clinical-records',
    label: 'Clinical Records',
    icon: 'bi-people',
    badgeKey: 'patientCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.Patient],
    children: [
      { id: 'chief-complaint', label: 'Chief Complaint', icon: 'bi-chat-left-heart-fill', route: 'patients/master/chiefofComplaint', appendParam: 'patientId', roles: [Roles.Patient] },
      { id: 'present-illness', label: 'Present Illness (HPI)', icon: 'bi-journal-medical', route: 'patients/master/presentillness', appendParam: 'patientId', roles: [Roles.Patient] },
      { id: 'physicial-examination', label: 'Physicial Examination', icon: 'bi-hospital-fill', route: 'patients/master/physicalexamination', appendParam: 'patientId', roles: [Roles.Patient] },
      { id: 'diagnosis-matrix', label: 'Dianogis Matrix', icon: 'bi-activity', route: '', roles: [Roles.Patient] },
      { id: 'treatment-plan', label: 'Treatment Plan', icon: 'bi-shield-exclamation', route: '', roles: [Roles.Patient] },
      { id: 'prescription', label: 'Prescription', icon: 'bi-capsule', route: 'prescription/master/list', roles: [Roles.Patient] },
    ]
  },
  {
    id: 'patient-history',
    label: 'Patient History',
    icon: 'bi-people',
    // badgeKey: 'patientCount',
    // badgeColor: 'var(--teal)',
    roles: [Roles.Patient],
    children: [
      { id: 'past-medical-history', label: 'Past Medical History', icon: 'bi-heart-pulse-fill', route: 'patients/master/pastmedicalhistory', appendParam: 'patientId', roles: [Roles.Patient] },
      { id: 'past-surgical-history', label: 'Past Surgical History', icon: 'bi-scissors', route: 'patients/master/pastsurgicalhistory', appendParam: 'patientId', roles: [Roles.Patient] },
      { id: 'family-history', label: 'Family History', icon: 'bi-virus', route: 'patients/master/familyhistory', appendParam: 'patientId', roles: [Roles.Patient] },
      { id: 'allergy-history', label: 'Allergy History', icon: 'bi-virus', route: 'patients/master/allergieshistory', appendParam: 'patientId', roles: [Roles.Patient] },
      { id: 'risk-factors', label: 'Risk Factors', icon: 'bi-asterisk', route: 'patients/master/riskfactor', appendParam: 'patientId', roles: [Roles.Patient] },
      { id: 'adverse-drug-reaction', label: 'Adverse Drug Reaction', icon: 'bi-capsule-pill', route: 'patients/master/adversedrugreaction', appendParam: 'patientId', roles: [Roles.Patient] },
      { id: 'family-hisoty-lineage', label: 'Family Hisoty Lineage', icon: 'bi-diagram-3', route: 'patients/master/familyhistorylineage', appendParam: 'patientId', roles: [Roles.Patient] },
      // { id: 'social-history', label: 'Social History', icon: 'bi-person-lines-fill', route: '', appendParam: 'patientId', roles: [Roles.Patient] },
      // { id: 'immunization-history', label: 'Immunization History', icon: 'bi-droplet', route: '', appendParam: 'patientId', roles: [Roles.Patient] },
      // { id: 'obstetric-gynae', label: 'Obstetric & Gynae', icon: 'bi-gender-female', route: '', appendParam: 'patientId', roles: [Roles.Patient] },
      // { id: 'psychiatric-history', label: 'Psychiatric History', icon: 'bi-brain', route: '', appendParam: 'patientId', roles: [Roles.Patient] },
      // { id: 'hospitalization', label: 'Hospitalization', icon: 'bi-building', route: '', appendParam: 'patientId', roles: [Roles.Patient] }
    ]
  },
];

/**
 * Recursively filters MENU_CONFIG (or any MenuItem[]) down to what a given
 * role should see. A parent with children is hidden entirely if none of its
 * children survive the filter — so you never get an empty flyout menu.
 * Works at any nesting depth, so submenus-of-submenus are handled for free.
 */
export function filterMenuByRole(items: MenuItem[], role?: Roles | string | null): MenuItem[] {
  if (!role) {
    return [];
  }

  return items.reduce<MenuItem[]>((acc, item) => {
    const allowed = !item.roles?.length || item.roles.includes(role as Roles);
    if (!allowed) {
      return acc;
    }

    if (item.children?.length) {
      const filteredChildren = filterMenuByRole(item.children, role);
      if (filteredChildren.length === 0) {
        return acc; // hide parent if nothing underneath survived the filter
      }
      acc.push({ ...item, children: filteredChildren });
    } else {
      acc.push({ ...item });
    }

    return acc;
  }, []);
}
