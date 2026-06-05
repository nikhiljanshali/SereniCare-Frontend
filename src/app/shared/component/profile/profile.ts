import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Clinics } from '../../../core/services/clinics';
import { UserDetails } from '../../../core/interface/authentication.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class DoctorProfile {
  title?: string;
  user: UserDetails;
  constructor(
    public bsModalRef: BsModalRef,
    public _clinics: Clinics
  ) {
    this.title = 'Profile';
    this.user = {} as UserDetails;
  }


  ngOnInit() {
    // this._clinics.getClinicDetailsById(this.doctor.id).subscribe((res) => {
    // });
  }

  close() {
    this.bsModalRef.hide();
  }
  save() {
    this.bsModalRef.hide();
  }

  submit() {
    console.log('Submitted');
    this.bsModalRef.hide();
  }
}
