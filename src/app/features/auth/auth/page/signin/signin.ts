import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../../../../../core/services/authentication';
import { StorageOperation } from '../../../../../core/services/storage-operation';
import { take } from 'rxjs';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  public signinForm!: FormGroup;
  public submitted = false;
  public showPassword = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authentication: Authentication,
    private _storageOperation: StorageOperation
  ) {
  }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.signinForm = this.fb.group({
      workEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
      terms: [false]
    });
  }

  get f() {
    return this.signinForm.controls;
  }

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched(); // 👈 important
      this.logInvalidFields();            // 👈 debug helper
      return;
    }
    this._authentication.signin(this.signinForm.getRawValue()).pipe(take(1)).subscribe({
      next: (data) => {
        if (data?.token) {
          this.router.navigate(['layout']);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }

  logInvalidFields() {
    Object.keys(this.signinForm.controls).forEach(field => {
      const control = this.signinForm.get(field);

      if (control && control.invalid) {
        console.log(`❌ ${field} is invalid`, control.errors);
      }
    });
  }
  public gotoCreateAccount(): void {
    this.router.navigate(['auth/signup']);
  }


  public gotoForgotPassword(): void {
    this.router.navigate(['auth/forget-password']);
  }

  public gotoPatientPortal(): void {
    this.router.navigate(['auth/patient-signup']);
  }

  public gotoClinicRegistration(): void {
    this.router.navigate(['clinic']);
  }
}
