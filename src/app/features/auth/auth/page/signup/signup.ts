import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authentication } from '../../../../../core/services/authentication';
import { take } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  public signupForm!: FormGroup;
  public submitted = false;
  public showPassword = false;
  public showConfirmPassword = false;
  public passwordStrength = 0; // 0 to 4
  public strengthLabel = 'Enter a password';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authentication: Authentication
  ) {
  }

  ngOnInit(): void {
    this.initSignUpForm();
    this.signupForm.get('password')?.valueChanges.subscribe(value => {
      this.calculatePasswordStrength(value || '');
    });
  }

  initSignUpForm() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      workEmail: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required], // 👈 NEW (default patient)
      terms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  // Getter for easy access
  get f() {
    return this.signupForm.controls;
  }

  // Custom validator
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    if (!confirm) return null;

    return password === confirm ? null : { passwordMismatch: true };
  }

  private calculatePasswordStrength(password: string) {
    let strength = 0;

    if (!password) {
      this.passwordStrength = 0;
      this.strengthLabel = 'Enter a password';
      return;
    }

    // Rules
    if (password.length >= 8) strength++;                 // length
    if (/[A-Z]/.test(password)) strength++;               // uppercase
    if (/[0-9]/.test(password)) strength++;               // number
    if (/[^A-Za-z0-9]/.test(password)) strength++;        // special char

    this.passwordStrength = strength;

    // Label
    switch (strength) {
      case 0:
      case 1:
        this.strengthLabel = 'Weak';
        break;
      case 2:
        this.strengthLabel = 'Medium';
        break;
      case 3:
        this.strengthLabel = 'Strong';
        break;
      case 4:
        this.strengthLabel = 'Very Strong';
        break;
    }
  }

  public onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) return;
    this._authentication.signup(this.signupForm.getRawValue()).pipe(take(1)).subscribe({
      next: (data) => {
        console.log('User created:', data);
        this.router.navigate(['auth/signin']);
      },
      error: (err) => {
        console.error('Signup failed:', err);
      }
    });
  }

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  public toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  public gotoSignin(): void {
    this.router.navigate(['auth/signin']);
  }
}
