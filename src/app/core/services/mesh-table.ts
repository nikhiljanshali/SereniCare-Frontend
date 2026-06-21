import { Injectable } from '@angular/core';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeshTable {

  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.meshTable + '/';
  }


  public getRoleByUserId(userId: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getRoleByUserId/${userId}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success('Success', `Role details fetched successfully`);
        }
      })
    );
  }

  public getDoctorCountByUserId(userId: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getDoctorCount/${userId}`).pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success('Success', `Count fetched successfully`);
        }
      })
    );
  }

  public getPatientCountByUserId(userId: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPatientCount/${userId}`).pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success('Success', `Count fetched successfully`);
        }
      })
    );
  }

  public getSupplierCountByUserId(userId: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getSupplierCount/${userId}`).pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success('Success', `Count fetched successfully`);
        }
      })
    );
  }

  public getCountsByUserId(userId: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getCounts/${userId}`).pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success('Success', `Count fetched successfully`);
        }
      })
    );
  }
}
