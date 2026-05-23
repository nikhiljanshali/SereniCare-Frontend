import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class PrimarySpecialityService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.primarySpeciality + '/';
  }


  public getAllPrimarySpeciality(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllSpeciality').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Primary Speciality Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getPrimarySpecialityById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getSpecialityById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Primary Speciality details fetched successfully`
          );
        }
      })
    );
  }


  public createSpeciality(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createSpeciality', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Speciality created successfully`
        );
      })
    );
  }


  public updateSpeciality(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateSpeciality/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Primary Speciality updated successfully'
          );
        })
      );
  }


  public deleteSpeciality(id: string | number): Observable<any> {
    return this._coreApiService
      .delete<any>(`${this.baseUrl}deleteSpeciality/${id}`)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Primary Speciality deleted successfully'
          );
        })
      );
  }
}
