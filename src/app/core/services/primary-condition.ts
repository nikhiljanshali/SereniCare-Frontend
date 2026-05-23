import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrimaryConditionService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.primaryCondition + '/';
  }

  public getAllPrimaryCondition(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllPrimaryCondition').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Primary Conditions Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getPrimaryConditionById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPrimaryConditionId/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Primary Conditions details fetched successfully`
          );
        }
      })
    );
  }

  public createPrimaryCondition(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createPrimaryCondition', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Primary Condition created successfully`
        );
      })
    );
  }

  public updatePrimaryCondition(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updatePrimaryCondition/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Primary Condition updated successfully'
          );
        })
      );
  }
  deletePrimaryCondition(id: string): Observable<any> {
    const url = `${this.baseUrl}deletePrimaryCondition/${id}`;
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
            'Primary Condition deleted successfully'
          );
        })
      );
  }

}
