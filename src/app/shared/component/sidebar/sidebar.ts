import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../../core/enum/common.enum';
import { UserDetails } from '../../../core/interface/authentication.interface';
import { DataCommunication } from '../../../core/services/data-communication';
import { MeshTable } from '../../../core/services/mesh-table';
import { StorageOperation } from '../../../core/services/storage-operation';
import { filterMenuByRole, MENU_CONFIG, MenuGroupItem, MenuItem } from '../../methods/menu.config';
import { CountData, CountMaster } from '../../../core/interface/basic.interface';


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
  public doctorId: string = '';
  public currentUserRole: string = '';
  public menuItems: MenuItem[] = [];
  public activeMenuId: number | string | null = null;
  public activeParentId: number | string | null = null;
  public countMaster: CountData | null = null;


  constructor(
    private dataCommunication: DataCommunication,
    private storageOperation: StorageOperation,
    private router: Router,
    private meshTable: MeshTable,
    private _storageOperation: StorageOperation
  ) {
    this.dataCommunication.toggleState$.subscribe(res => {
      this.isEnabled = res;
    });
    if (this._storageOperation.get<UserDetails>('user', 'local')?.role) {
      this.currentUserRole = this._storageOperation.get<UserDetails>('user', 'local')?.role ?? '';
      this.doctorId = this._storageOperation.get<UserDetails>('userDetails', 'local')?.id || '';
    }
  }

  ngOnInit(): void {
    this.initMenu();
    this.loadUserRole();
    this.loadCount();
  }

  private initMenu(): void {
    const user = this.storageOperation.get<{ role: Roles; }>('user', 'local');
    this.menuItems = filterMenuByRole(MENU_CONFIG, user?.role);
    this.resolveBadges(this.menuItems);
  }


  private resolveBadges(items: MenuItem[]): void {
    items.forEach(item => {
      if (item.badgeKey) {
        item.badge = () => String(
          (this as any)[item.badgeKey!] ?? 0
        );
      } else if (item.badgeStatic !== undefined) {
        item.badge = item.badgeStatic;
      }
      if (item.children?.length) {
        this.resolveBadges(item.children);
      }
    });
  }

  public getRoute(item: MenuItem): string {
    if (!item.route) { return ''; }
    if (!item.appendParam) {
      return item.route;
    }
    const value = (this as any)[item.appendParam];
    return value ? `${item.route}/${value}` : item.route;
  }

  private loadCount(): void {
    const user: { id: string; name: string; email: string } | null = this.storageOperation.get('user', 'local');
    this.meshTable.getCountsByUserId(user?.id!).subscribe((res) => {
      this.countMaster = res.data;
      // console.log(this.countMaster);
    });
  }

  public onMenuClick(item: any): void {
    this.activeMenuId = item.id;
    this.activeParentId = null;

    if (item.children?.length) {
      this.toggleNav(item.id);
    }
  }

  public onChildMenuClick(child: any, parentId: number | string): void {
    this.activeMenuId = child.id;
    this.activeParentId = parentId;
    this.openMenus[parentId] = true;
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

