import { Injectable } from '@angular/core';
import { CoreApiService } from './core-api-service';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationServices } from './notification-services';


@Injectable({
  providedIn: 'root',
})
export class ClinicStampUploadService {

  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.clinicstamp + '/';
  }

  public uploadClinicStamp(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'uploadClinicStamp', value, true).pipe(
      map((res: any) => res.data),
      tap((data) => {
        this._notificationServices.success('success', `Clinic Stamp Uploaded Successfully`);
      })
    );
  }

  public getClinicStampsByClinicId(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getClinicStampsByClinicId/${id}`).pipe(
      map((res: any) => res),
      tap((data: any) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Clinic stamp details fetched successfully`
          );
        }
      })
    );
  }

  public deleteClinicStamp(id: string, showNotificaion: boolean = false): Observable<any> {
    const url = `${this.baseUrl}deleteClinicStamp/${id}`;
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
          if (showNotificaion) {
            this._notificationServices.success(
              'success',
              'Clinic stamps deleted successfully'
            );
          }
        })
      );
  }
}
