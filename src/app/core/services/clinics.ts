import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Clinics {

  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.clinics + '/';
  }

  public createClinic(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createClinic', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Clinic created successfully`
        );
      })
    );
  }
  public getClinicDetailsById(id: string): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getClinicById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'Success',
          `${data?.clinicName} details fetched successfully`
        );
      })
    );
  }

  public getAllClinics(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllClinics').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Doctors Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getClinicByDoctorId(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getClinicByDoctorId/${id}`).pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Clinics fetched successfully`
          );
        }
      })
    );
  }

}
