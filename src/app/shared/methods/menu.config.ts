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
    label: 'Patient Management',
    icon: 'bi-people',
    badgeKey: 'patientCount',
    badgeColor: 'var(--teal)',
    roles: [Roles.Patient],
    children: [
      { id: 'patient-profile', label: 'Patient Profile', icon: 'bi-person', route: 'patients/master/profile', roles: [Roles.Patient] },
      // FIXED: this was roles: [Roles.SystemAdmin] in the original, which meant doctors never saw it
      { id: 'book-appointment', label: 'Book Appointment', icon: 'bi-plus-circle', route: '', roles: [Roles.Patient] },
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
      { id: 'prescription', label: 'Prescription', icon: 'bi-capsule', route: '', roles: [Roles.Patient] },
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
