import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCommunication } from '../../../core/services/data-communication';
import { StorageOperation } from '../../../core/services/storage-operation';
import { Roles } from '../../../core/enum/common.enum';
import { UserDetails } from '../../../core/interface/authentication.interface';
import { MeshTable } from '../../../core/services/mesh-table';
import { MenuItem } from '../../../core/interface/basic.interface';



@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  public isEnabled: boolean = true;
  public userRole: Roles | null = null;
  public openMenus: { [key: string]: boolean } = {};
  public doctorCount: number = 0;
  public patientCount: number = 0;

  // public menuItems: MenuItem[] = [];
  public menuItems: MenuItem[] = [];
  public operationsMenu: MenuItem[] = [];

  // 🎯 Role-Based Menu Configuration
  // public menuItems: MenuItem[] = [
  //   {
  //     label: 'Dashboard',
  //     icon: 'bi-grid-1x2',
  //     routerLink: '/layout/dashboard',
  //     roles: [Roles.SystemAdmin, Roles.Admin, Roles.Doctor, Roles.Patient]
  //   },
  //   {
  //     label: 'Clinical',
  //     icon: '',
  //     roles: [Roles.SystemAdmin, Roles.Admin, Roles.Doctor, Roles.Patient],
  //     children: [
  //       {
  //         label: 'Patients',
  //         icon: 'bi-people',
  //         routerLink: '/layout/patient',
  //         roles: [Roles.SystemAdmin, Roles.Doctor, Roles.Patient]
  //       },
  //       {
  //         label: 'Appointments',
  //         icon: 'bi-calendar2-check',
  //         badge: 12,
  //         routerLink: '/layout/patient/appointments',
  //         roles: [Roles.SystemAdmin, Roles.Doctor, Roles.Patient]
  //       },
  //       {
  //         label: 'Medical Records',
  //         icon: 'bi-clipboard2-pulse',
  //         routerLink: '/layout/patient/records',
  //         roles: [Roles.SystemAdmin, Roles.Doctor, Roles.Patient]
  //       },
  //       {
  //         label: 'Prescriptions',
  //         icon: 'bi-capsule',
  //         badge: 3,
  //         badgeColor: '#f43f5e',
  //         routerLink: '/layout/patient/prescriptions',
  //         roles: [Roles.SystemAdmin, Roles.Doctor]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Clinic Management',
  //     icon: '',
  //     roles: [Roles.SystemAdmin, Roles.Admin],
  //     children: [
  //       {
  //         label: 'Clinic Setup',
  //         icon: 'bi-hospital',
  //         routerLink: '/layout/clinic/registration',
  //         roles: [Roles.SystemAdmin, Roles.Admin]
  //       },
  //       {
  //         label: 'Clinic Types',
  //         icon: 'bi-tag',
  //         routerLink: '/layout/clinic/clinictype',
  //         roles: [Roles.SystemAdmin, Roles.Admin]
  //       },
  //       {
  //         label: 'Specialities',
  //         icon: 'bi-diagram-3',
  //         routerLink: '/layout/clinic/speciality',
  //         roles: [Roles.SystemAdmin, Roles.Admin]
  //       },
  //       {
  //         label: 'Roles & Permissions',
  //         icon: 'bi-shield-lock',
  //         routerLink: '/layout/clinic/role',
  //         roles: [Roles.SystemAdmin]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Operations',
  //     icon: '',
  //     roles: [Roles.SystemAdmin, Roles.Admin],
  //     children: [
  //       {
  //         label: 'Inventory',
  //         icon: 'bi-box-seam',
  //         routerLink: '/layout/inventory',
  //         roles: [Roles.SystemAdmin, Roles.Admin]
  //       },
  //       {
  //         label: 'Billing',
  //         icon: 'bi-currency-dollar',
  //         routerLink: '/layout/billing',
  //         roles: [Roles.SystemAdmin, Roles.Admin]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Reports',
  //     icon: 'bi-bar-chart-line',
  //     routerLink: '/layout/reports',
  //     roles: [Roles.SystemAdmin, Roles.Admin]
  //   },
  //   {
  //     label: 'Settings',
  //     icon: 'bi-gear',
  //     routerLink: '/layout/settings',
  //     roles: [Roles.SystemAdmin, Roles.Admin]
  //   }
  // ];



  constructor(
    private dataCommunication: DataCommunication,
    private storageOperation: StorageOperation,
    private router: Router,
    private meshTable: MeshTable
  ) {
    this.dataCommunication.toggleState$.subscribe(res => {
      this.isEnabled = res;
    });
  }

  ngOnInit(): void {
    this.initMenu();
    this.loadUserRole();
    this.loadDoctorCount();
    this.loadPatientCount();
  }

  private initMenu(): void {
    const user: { id: string, firstName: string, lastName: string, workEmail: string, phone: number, role: string } | null = this.storageOperation.get('user', 'local');
    if (user?.role === Roles.SystemAdmin) {
      this.menuItems = [
        {
          id: 'appointments',
          label: 'Appointments',
          icon: 'bi-calendar2-check',
          badge: 12,
          roles: ['System Admin'],
          children: [
            {
              id: 'calendar',
              label: 'Calendar View',
              icon: 'bi-calendar3',
              roles: ['System Admin']
            },
            {
              id: 'all',
              label: 'All Appointments',
              icon: 'bi-list-ul',
              roles: ['System Admin']
            },
            {
              id: 'book',
              label: 'Book Appointment',
              icon: 'bi-plus-circle',
              roles: ['System Admin']
            }
          ]
        },
        {
          id: 'patient',
          label: 'Patients',
          icon: 'bi-people',
          badge: () => `${this.patientCount}`,
          badgeColor: 'var(--rose)',
          roles: ['System Admin'],
          children: [
            {
              id: 'list',
              label: 'Patient List',
              icon: 'bi-person-lines-fill',
              route: 'patients/master/list',
              roles: ['System Admin']
            },
            {
              id: 'register',
              label: 'Register Patient',
              icon: 'bi-person-plus',
              route: 'patients/master/registration',
              roles: ['System Admin']
            }
          ]
        },
        {
          id: 'doctor',
          label: 'Doctors',
          icon: 'bi-people',
          badge: () => `${this.doctorCount}`,
          badgeColor: 'var(--rose)',
          roles: ['ADMIN'],
          children: [
            {
              id: 'clinic',
              label: 'Clinic List',
              icon: 'bi-hospital-fill',
              route: 'doctors/master/clinics',
              roles: ['System Admin']
            },
            {
              id: 'list',
              label: 'Doctor List',
              icon: 'bi-person-lines-fill',
              route: 'doctors/master/list',
              roles: ['System Admin']
            },
            {
              id: 'register',
              label: 'Register Doctor',
              icon: 'bi-person-plus',
              route: 'doctors/master/registration',
              roles: ['System Admin']
            }
          ]
        },
        {
          id: 'prescriptions',
          label: 'Prescriptions',
          icon: 'bi-capsule',
          badge: 3,
          roles: ['System Admin'],
          children: [
            {
              id: 'new',
              label: 'New Prescription',
              icon: 'bi-clipboard-plus',
              roles: ['System Admin']
            },
            {
              id: 'all',
              label: 'All Prescriptions',
              icon: 'bi-list-check',
              roles: ['System Admin']
            },
            {
              id: 'refill',
              label: 'Refill Requests',
              icon: 'bi-repeat',
              roles: ['System Admin']
            }
          ]
        }
      ];
    }
    else if (user?.role === Roles.Doctor) {
      this.operationsMenu = [
        {
          id: 'doctors',
          label: 'Doctor Support',
          icon: 'bi-people',
          badge: () => `${this.doctorCount}`,
          badgeColor: 'var(--rose)',
          roles: ['doctor'],
          children: [
            {
              id: 'profile',
              label: 'Profile',
              icon: 'bi-person',
              route: 'doctors/master/doctor-profile',
              roles: ['doctor']
            },
            {
              id: 'clinics',
              label: 'All Clinics',
              icon: 'bi-hospital-fill',
              route: 'doctors/master/doctor-clinics',
              roles: ['doctor']
            },
          ]
        }
      ];
      this.menuItems = [
        {
          id: 'appointments',
          label: 'Appointments',
          icon: 'bi-calendar2-check',
          badge: 12,
          roles: ['doctor'],
          children: [
            {
              id: 'calendar',
              label: 'Calendar View',
              icon: 'bi-calendar3',
              route: 'doctors/master/calendar',
              roles: ['doctor']
            },
            {
              id: 'all',
              label: 'All Appointments',
              icon: 'bi-list-ul',
              route: 'doctors/master/appointements',
              roles: ['doctor']
            },
            {
              id: 'book',
              label: 'Book Appointment',
              icon: 'bi-plus-circle',
              route: 'doctors/master/bookappointment',
              roles: ['doctor']
            }
          ]
        }
      ];
    }
  }

  private loadDoctorCount(): void {
    const user: { id: string; name: string; email: string } | null = this.storageOperation.get('user', 'local');
    this.meshTable.getDoctorCountByUserId(user?.id!).subscribe(res => {
      this.doctorCount = res.data.doctorCount;
    });
  }

  private loadPatientCount(): void {
    const user: { id: string; name: string; email: string } | null = this.storageOperation.get('user', 'local');
    this.meshTable.getPatientCountByUserId(user?.id!).subscribe(res => {
      this.patientCount = res.data.patientCount;
    });
  }


  // 🔐 Load user role from localStorage
  private loadUserRole(): void {
    const user = this.storageOperation.get('user', 'local') as UserDetails | null;
    if (user && user.role) {
      this.userRole = user.role as Roles;
    }
  }

  // ✅ Check if menu item should be visible for current user role
  public canViewMenuItem(roles: Roles[]): boolean {
    return this.userRole ? roles.includes(this.userRole) : false;
  }

  // 🔀 Navigate and handle route
  // public navigate(routerLink?: string): void {
  //   if (routerLink) {
  //     this.router.navigate([routerLink]);
  //   }
  // }

  toggleNav(menu: string, event?: Event) {
    if (event) {
      event.stopPropagation(); // ✅ prevent parent toggle
    }

    const isOpen = this.openMenus[menu];

    // Close siblings ONLY at same level (important)
    Object.keys(this.openMenus).forEach(key => {
      if (key !== menu) {
        this.openMenus[key] = false;
      }
    });

    this.openMenus[menu] = !isOpen;
  }

  /* Optional navigation handler */
  navigate(route: string, event: Event) {
    event.stopPropagation();

    if (route === 'calendar') {
      this.router.navigate(['/patients/appointments/calendar']);
    }
  }
}

