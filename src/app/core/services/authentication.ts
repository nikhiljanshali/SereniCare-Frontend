import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, map, tap } from 'rxjs';
import { SignupResponse, SigninResponse } from '../interface/authentication.interface';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { StorageOperation } from './storage-operation';
import { IUserQueryParams, IUserListResponse } from '../interface/basic.interface';

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

  public sendOTP(
    value: object,
    showNotification: boolean = false
  ): Observable<{ success: boolean; data: any }> {

    return this._coreApiService
      .post<any>(this.baseUrl + 'sendOTP', value, true)
      .pipe(
        map((res: any) => ({
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

  public verifyOtp(
    value: object,
    showNotification: boolean = false
  ): Observable<{ success: boolean; data: any }> {

    return this._coreApiService
      .post<any>(this.baseUrl + 'verifyOtp', value, true)
      .pipe(
        map((res: any) => ({
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
        map((res: any) => ({
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

  public getUsers(params?: IUserQueryParams, showNotification: boolean = false): Observable<IUserListResponse> {
    const queryParams: string[] = [];
    if (params?.page !== undefined) {
      queryParams.push(`page=${params.page}`);
    }
    if (params?.limit !== undefined) {
      queryParams.push(`limit=${params.limit}`);
    }
    if (params?.search) {
      queryParams.push(`search=${encodeURIComponent(params.search.trim())}`);
    }
    if (params?.role) {
      queryParams.push(`role=${encodeURIComponent(params.role.trim())}`);
    }
    if (params?.sortBy) {
      queryParams.push(`sortBy=${params.sortBy}`);
    }
    if (params?.sortOrder) {
      queryParams.push(`sortOrder=${params.sortOrder}`);
    }
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    console.log('Test');
    debugger;
    return this._coreApiService.get<IUserListResponse>(`${this.baseUrl}getAll${queryString}`).pipe(
      map(res => res.data), // Extract 'data' from ApiResponse wrapper
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Users retrieved successfully'
          );
        }
      })
    );
  }

  public getAllUsers(showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getAllUsers`).pipe(map(res => res.data), tap(() => {
      if (showNotification) {
        this._notificationServices.success(
          'Success',
          'Users fetched successfully'
        );
      }
    }));
  }
}
