import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Authentication } from '../../../../../core/services/authentication';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-resetpassword',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.css',
})
export class Resetpassword {

  resetForm!: FormGroup;

  showPassword = false;
  showConfirmPassword = false;

  passwordStrength = '';
  passwordStrengthLevel = 0;

  passwordRequirements = {
    length: false,
    uppercase: false,
    number: false,
    special: false
  };

  showSuccessScreen = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authentication: Authentication
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // =========================
  // 🔹 Toggle Password
  // =========================
  togglePassword(field: 'password' | 'confirmPassword'): void {

    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // =========================
  // 🔹 Password Validation
  // =========================
  checkResetPassword(): void {

    const password = this.resetForm.get('password')?.value || '';

    this.passwordRequirements.length = password.length >= 8;
    this.passwordRequirements.uppercase = /[A-Z]/.test(password);
    this.passwordRequirements.number = /\d/.test(password);
    this.passwordRequirements.special =
      /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const passedRules = Object.values(this.passwordRequirements)
      .filter(Boolean).length;

    this.passwordStrengthLevel = passedRules;

    switch (passedRules) {

      case 1:
        this.passwordStrength = 'Weak';
        break;

      case 2:
        this.passwordStrength = 'Fair';
        break;

      case 3:
        this.passwordStrength = 'Good';
        break;

      case 4:
        this.passwordStrength = 'Strong';
        break;

      default:
        this.passwordStrength = 'Enter a password';
        break;
    }
  }

  // =========================
  // 🔹 Password Match Check
  // =========================
  get passwordsDoNotMatch(): boolean {

    const password =
      this.resetForm.get('password')?.value;

    const confirmPassword =
      this.resetForm.get('confirmPassword')?.value;

    return !!(
      confirmPassword &&
      password !== confirmPassword
    );
  }

  // =========================
  // 🔹 Reset Password
  // =========================
  handleResetPassword(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    if (this.passwordsDoNotMatch) {
      return;
    }
    console.log(this.resetForm.value);
    // API CALL HERE
    this._authentication.ResetPassword({ email: this.router.url.split('=')[1], password: this.resetForm.value.password }, true)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          if(data.success) {
            this.showSuccessScreen = true;
            // this.router.navigate(['auth/signin']);
          }
        },
        error: (err) => {
          console.error('Signup failed:', err);
        }
      });
  }

  // =========================
  // 🔹 Requirement Checker
  // =========================
  hasRequirement(type: string): boolean {

    return this.passwordRequirements[
      type as keyof typeof this.passwordRequirements
    ];
  }
}
