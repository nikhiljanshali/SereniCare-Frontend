import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClinicTypeService {

  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.clinicType + '/';
  }



  public getCliniAllType(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllClinicTypes').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Clinic Types Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getClinicTypesById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getClinicTypeById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Clinic types details fetched successfully`
          );
        }
      })
    );
  }

  public createClinicType(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createClinicType', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Clinic type created successfully`
        );
      })
    );
  }

  public updateClinicType(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateClinicType/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Clinic type updated successfully'
          );
        })
      );
  }

  deleteClinicType(id: string): Observable<any> {
    const url = `${this.baseUrl}deleteClinicType/${id}`;

    console.log('DELETE:', url);

    return this._coreApiService
      .delete<any>(url)
      .pipe(
        map((res: any) => {
          if (!res?.status) {
            throw new Error(res?.message || 'Delete failed');
          }
          return res.data;
        }),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Clinic type deleted successfully'
          );
        })
      );
  }


}
