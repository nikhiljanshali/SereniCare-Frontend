import { Injectable } from '@angular/core';
import { CoreApiService } from './core-api-service';
import { environment } from '../../../environments/environment';
import { NotificationServices } from './notification-services';
import { StorageOperation } from './storage-operation';
import { SigninResponse, SignupResponse } from '../interface/authentication.interface';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices,
    private _storageOperation: StorageOperation
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.authentication + '/';
  }

  // =======================
  // 🔹 SIGNUP
  // =======================
  public signup(value: object): Observable<SignupResponse> {
    return this._coreApiService.post<SignupResponse>(this.baseUrl + 'signup', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Welcom, Mr. ${data.firstName} ${data.lastName}, Your account created successfully`
        );
      })
    );
  }

  // =======================
  // 🔹 SIGNIN
  // =======================
  public signin(value: object, showNotification: boolean = false): Observable<SigninResponse> {
    return this._coreApiService.post<SigninResponse>(this.baseUrl + 'signin', value, true).pipe(map(res => res.data),
      tap((data) => {
        this._storageOperation.set('user', data.user, 'local');
        this._storageOperation.set('token', data.token, 'session');
        if (data.userDetails) {
          this._storageOperation.set('userDetails', data.userDetails, 'local');
        }
        if (data.clinic) {
          this._storageOperation.set('clinic', data.clinic, 'local');
        }
        // Replace 'clinic' with 'settings' or any other allowed value
        // 🔔 Notify
        if (showNotification) {
          this._notificationServices.success(
            'success',
            `Welcome ${data.user.role === 'Patient' ? 'Pt.' : 'Dr.'} ${data.user.firstName} ${data.user.lastName}.`
          );
        }
      })
    );
  }

  // =======================
  // 🔹 sendOTP
  // =======================
  public sendOTP(
    value: object,
    showNotification: boolean = false
  ): Observable<{ success: boolean; data: any }> {

    return this._coreApiService
      .post<any>(this.baseUrl + 'sendOTP', value, true)
      .pipe(
        map((res) => ({
          success: true,
          data: res.data
        })),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'success',
              'OTP sent successfully'
            );
          }
        })
      );
  }

  // =======================
  // 🔹 verifyOtp
  // =======================
  public verifyOtp(
    value: object,
    showNotification: boolean = false
  ): Observable<{ success: boolean; data: any }> {

    return this._coreApiService
      .post<any>(this.baseUrl + 'verifyOtp', value, true)
      .pipe(
        map((res) => ({
          success: true,
          data: res.data
        })),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'success',
              'OTP verified successfully'
            );
          }
        })
      );
  }

  public ResetPassword(value: object, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'resetPassword', value, true)
      .pipe(
        map((res) => ({
          success: true,
          data: res.data
        })),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'success',
              'Password reset successfully'
            );
          }
        })
      );
  }
}
