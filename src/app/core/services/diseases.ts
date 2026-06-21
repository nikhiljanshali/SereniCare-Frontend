import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DiseasesService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.diseases + '/';
  }

  public getAllDiseases(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllDiseases').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Diseases Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getDiseasesById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getDiseasesById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Diseases details fetched successfully`
          );
        }
      })
    );
  }

  public createDiseases(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createDiseases', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Diseases  created successfully`
        );
      })
    );
  }

  public updateDiseases(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateDiseases/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Diseases  updated successfully'
          );
        })
      );
  }
  deleteDiseases(id: string): Observable<any> {
    const url = `${this.baseUrl}deleteDiseases/${id}`;
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
            'Diseases  deleted successfully'
          );
        })
      );
  }

}
