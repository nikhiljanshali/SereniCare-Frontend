import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurgeryService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.surgery + '/';
  }

  public getAllSurgery(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllSurgery').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Surgery Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getSurgeryById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getSurgeryById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Surgery details fetched successfully`
          );
        }
      })
    );
  }

  public createSurgery(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createSurgery', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Surgery  created successfully`
        );
      })
    );
  }

  public updateSurgery(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateSurgery/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Surgery  updated successfully'
          );
        })
      );
  }
  deleteSurgery(id: string): Observable<any> {
    const url = `${this.baseUrl}deleteSurgery/${id}`;
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
            'Surgery  deleted successfully'
          );
        })
      );
  }

}
