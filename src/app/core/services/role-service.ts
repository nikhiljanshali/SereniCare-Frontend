import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.role + '/';
  }

  public getAllRoles(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllrole').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Role Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getRoleById(id: string): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getroleById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'Success',
          `Role details fetched successfully`
        );
      })
    );
  }
  public createRole(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createrole', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Role created successfully`
        );
      })
    );
  }

  public updateRole(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updaterole/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Role updated successfully'
          );
        })
      );
  }

  public deleteRole(id: string | number): Observable<any> {
    return this._coreApiService
      .delete<any>(`${this.baseUrl}deleterole/${id}`)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Role deleted successfully'
          );
        })
      );
  }
}
