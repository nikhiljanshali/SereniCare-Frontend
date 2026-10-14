import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { StorageOperation } from './storage-operation';

@Injectable({
  providedIn: 'root',
})
export class NurseService {
  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices,
    private _storageOperation: StorageOperation
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.nurse + '/';
  }

  public getAllNurses(showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl).pipe(
      map(res => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Nurses fetched successfully'
          );
        }
      })
    );
  }

  public getNurseById(id: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}${id}`).pipe(
      map(res => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Nurse fetched successfully'
          );
        }
      })
    );
  }

  public getNursesByDepartmentId(departmentId: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}department/${departmentId}`).pipe(
      map(res => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Department nurses fetched successfully'
          );
        }
      })
    );
  }

  public registerNurse(payload: any): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl, payload).pipe(
      map((res: any) => res.data),
      tap((data: any) => {
        this._notificationServices.success(
          'Success',
          `Nurse ${data?.firstName || ''} ${data?.lastName || ''} registered successfully`
        );
      })
    );
  }

  public updateNurse(id: string, payload: any): Observable<any> {
    return this._coreApiService.put<any>(`${this.baseUrl}${id}`, payload).pipe(
      map((res: any) => res.data),
      tap((data: any) => {
        this._notificationServices.success(
          'Success',
          `Nurse ${data?.firstName || ''} ${data?.lastName || ''} updated successfully`
        );
      })
    );
  }

  public deleteNurse(id: string): Observable<any> {
    return this._coreApiService.delete<any>(`${this.baseUrl}${id}`).pipe(
      map((res: any) => res),
      tap(() => {
        this._notificationServices.success(
          'Success',
          'Nurse record deleted successfully'
        );
      })
    );
  }
}
