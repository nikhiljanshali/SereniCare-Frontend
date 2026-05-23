import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BloodGroupService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.bloodGroup + '/';
  }

  public getAllBloodGroup(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllBloodGroup').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Blood Groups Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getBloodGroupById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getBloodGroupId/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Blood Groups details fetched successfully`
          );
        }
      })
    );
  }

  public createBloodGroup(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createBloodGroup', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Blood Group created successfully`
        );
      })
    );
  }

  public updateBloodGroup(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateBloodGroup/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Blood Group updated successfully'
          );
        })
      );
  }
  deleteBloodGroup(id: string): Observable<any> {
    const url = `${this.baseUrl}deleteBloodGroup/${id}`;
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
            'Blood Group deleted successfully'
          );
        })
      );
  }

}
