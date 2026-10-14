import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class DepartmentTypeService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.department + '/';
  }

  public getDepartmentAllType(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAlldepartmentTypes').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Department Types Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getDepartmentTypesById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getdepartmentTypeById/${id}`).pipe(
      map((res: any) => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Department types details fetched successfully`
          );
        }
      })
    );
  }

  public createDepartmentType(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createdepartmentType', value, true).pipe(
      map((res: any) => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Department type created successfully`
        );
      })
    );
  }

  public updateDepartmentType(id: string | number, value: object): Observable<any> {
    return this._coreApiService.put<any>(`${this.baseUrl}updatedepartmentType/${id}`, value, true)
      .pipe(
        map((res: any) => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Department type updated successfully'
          );
        })
      );
  }

  deleteDepartmentType(id: string): Observable<any> {
    const url = `${this.baseUrl}deletedepartmentType/${id}`;
    return this._coreApiService.delete<any>(url).pipe(
      map((res: any) => {
        if (!res?.status) {
          throw new Error(res?.message || 'Delete failed');
        }
        return res.data;
      }),
      tap(() => {
        this._notificationServices.success(
          'success',
          'Department type deleted successfully'
        );
      })
    );
  }

}
