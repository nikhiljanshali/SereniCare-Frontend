import { Component, HostListener } from '@angular/core';
import { DataCommunication } from '../../../core/services/data-communication';
import { StorageOperation } from '../../../core/services/storage-operation';
import { Router } from '@angular/router';
import { UserDetails } from '../../../core/interface/authentication.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DoctorProfile } from '../profile/profile';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public isSidebarOpen: boolean = false;
  public isProfileMenuOpen = false;
  public isSettingsMenuOpen = false;
  public userDetails: UserDetails | null = null;

  public selectedTheme = 'blue';
  public selectedLanguage = 'en';

  public bsModalRef?: BsModalRef;


  constructor(
    private router: Router,
    private dataCommunication: DataCommunication,
    private _storageOperation: StorageOperation,
    private modalService: BsModalService
  ) {
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('.topbar-settings') && !target.closest('.settings-menu')) {
      this.isSettingsMenuOpen = false;
    }

    if (!target.closest('.topbar-avatar') && !target.closest('.profile-menu')) {
      this.isProfileMenuOpen = false;
    }
  }

  ngOnInit() {
    this.userDetails = this._storageOperation.get<UserDetails>('user', 'local');
  }

  public toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  public toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;

    // optional: close profile menu if open
    this.isProfileMenuOpen = false;
  }

  public goToProfile() {
    const initialState = {
      user: {
        id: this.userDetails?.id ?? '',
        firstName: this.userDetails?.firstName ?? '',
        lastName: this.userDetails?.lastName ?? '',
        workEmail: this.userDetails?.workEmail ?? '',
        phone: this.userDetails?.phone ?? 0, // Assuming phone is a number
        role: this.userDetails?.role ?? '',
      }
    };
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    this.bsModalRef = this.modalService.show(DoctorProfile,
      {
        initialState,
        class: 'modal-md modal-dialog-centered',
        backdrop: true,
        ignoreBackdropClick: true
      }
    );
  }

  public goToSettings() {
    console.log('Go to settings');
  }

  public logout() {
    this._storageOperation.remove('token', 'session');
    this._storageOperation.remove('user', 'local');
    this._storageOperation.clear('session');
    this._storageOperation.clear('local');
    this.router.navigate(['auth/signin']);
  }

  public toggleSidebar() {
    this.dataCommunication.toggle();
  }


  // dummy actions
  public changeTheme() {
    console.log('Theme clicked');
  }

  public changeLanguage() {
    console.log('Language clicked');
  }

  public openPreferences() {
    console.log('Preferences clicked');
  }

  public setTheme(theme: string) {
    this.selectedTheme = theme;
    console.log('Theme:', theme);

    // optional: apply theme class to body
    document.body.setAttribute('data-theme', theme);
  }

  public setLanguage(lang: string) {
    this.selectedLanguage = lang;
    console.log('Language:', lang);
  }

}
