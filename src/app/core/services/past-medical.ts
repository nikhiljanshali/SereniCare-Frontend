import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PastMedicalService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.pastMedical + '/';
  }

  public getAllPastMedical(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllPastMedical').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `PastMedical Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getPastMedicalById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPastMedicalById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PastMedical details fetched successfully`
          );
        }
      })
    );
  }
  public getPastMedicalByPatientId(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPastMedicalByPatientId/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PastMedical details fetched successfully`
          );
        }
      })
    );
  }

  public createPastMedical(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createPastMedical', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `PastMedical  created successfully`
        );
      })
    );
  }

  public updatePastMedical(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updatePastMedical/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'PastMedical  updated successfully'
          );
        })
      );
  }
  deletePastMedical(id: string): Observable<any> {
    const url = `${this.baseUrl}deletePastMedical/${id}`;
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
            'PastMedical  deleted successfully'
          );
        })
      );
  }

}
