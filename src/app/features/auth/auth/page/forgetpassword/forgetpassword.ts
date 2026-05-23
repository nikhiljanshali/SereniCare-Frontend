import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../../../../../core/services/authentication';
import { take } from 'rxjs';

@Component({
  selector: 'app-forgetpassword',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.html',
  styleUrl: './forgetpassword.css',
})
export class Forgetpassword {
  Math: typeof Math = Math; // Add this line

  step: 1 | 2 = 1;
  emailSentTo = '';
  timer: number = 300; // 5 minutes in seconds
  interval: any;

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authentication: Authentication
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: this.fb.array(new Array(6).fill('').map(() =>
        this.fb.control('', [Validators.required, Validators.maxLength(1)])
      ))
    });
  }

  get otpControls() {
    return (this.form.get('otp') as FormArray).controls;
  }

  sendOtp() {
    if (this.form.get('email')?.invalid) return;

    this.emailSentTo = this.form.value.email;

    this._authentication.sendOTP({ email: this.emailSentTo })
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.step = 2;

          // Start 5 minute timer
          this.startTimer();
        },
        error: (err) => {
          console.error('Signup failed:', err);
        }
      });
  }

  startTimer() {
    // Clear previous timer if exists
    clearInterval(this.interval);

    this.timer = 300;

    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        console.log('OTP expired');
      }
    }, 1000);
  }

  verifyOtp() {
    if (this.form.get('otp')?.invalid) return;

    const otp = this.form.value.otp.join('');
    this._authentication.verifyOtp({ email: this.emailSentTo, otp: otp })
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log('OTP verified', data);
          if (data.success) {
            this.router.navigate(
              ['auth/reset-password'],
              {
                queryParams: {
                  email: this.form.value.email
                }
              }
            );
          }
        },
        error: (err) => {
          console.error('Signup failed:', err);
        }
      });
    // API call here
  }

  moveNext(event: any, index: number) {
    const input = event.target;
    if (input.value && index < 5) {
      const next = input.parentElement.children[index + 1];
      next.focus();
    }
  }

  changeEmail() {
    this.step = 1;
  }


  public gotoSignin(): void {
    this.router.navigate(['auth/signin']);
  }

}
