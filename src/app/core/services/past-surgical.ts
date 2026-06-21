import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PastSurgicalService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.pastSurgical + '/';
  }

  public getAllPastSurgical(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllPastSurgical').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `PastSurgical Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getPastSurgicalById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPastSurgicalById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PastSurgical details fetched successfully`
          );
        }
      })
    );
  }
  public getPastSurgicalByPatientId(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPastSurgicalByPatientId/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PastSurgical details fetched successfully`
          );
        }
      })
    );
  }

  public createPastSurgical(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createPastSurgical', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `PastSurgical  created successfully`
        );
      })
    );
  }

  public updatePastSurgical(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updatePastSurgical/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'PastSurgical  updated successfully'
          );
        })
      );
  }
  deletePastSurgical(id: string): Observable<any> {
    const url = `${this.baseUrl}deletePastSurgical/${id}`;
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
            'PastSurgical  deleted successfully'
          );
        })
      );
  }

}
