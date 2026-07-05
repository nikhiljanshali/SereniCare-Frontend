import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';


@Injectable({
  providedIn: 'root',
})
export class RiskMasterService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.riskMaster + '/';
  }

  public getAllRiskMaster(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllRiskMaster').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `RiskMaster Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getRiskMasterById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getRiskMasterById/${id}`).pipe(
      map((res: any) => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `RiskMaster details fetched successfully`
          );
        }
      })
    );
  }

  public createRiskMaster(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createRiskMaster', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `RiskMaster  created successfully`
        );
      })
    );
  }

  public updateRiskMaster(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateRiskMaster/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'RiskMaster  updated successfully'
          );
        })
      );
  }
  // deleteRiskMaster(id: string): Observable<any> {
  //   const url = `${this.baseUrl}deleteRiskMaster/${id}`;
  //   return this._coreApiService
  //     .delete<any>(url)
  //     .pipe(
  //       map((res: any) => {
  //         if (!res?.status) {
  //           throw new Error(res?.message || 'Delete failed');
  //         }
  //         return res.data;
  //       }),
  //       tap(() => {
  //         this._notificationServices.success(
  //           'success',
  //           'RiskMaster  deleted successfully'
  //         );
  //       })
  //     );
  // }

  public deleteRiskMaster(id: string): Observable<any> {
    const url = `${this.baseUrl}deleteRiskMaster/${id}`;
    return this._coreApiService.delete<any>(url).pipe(
      map((res: any) => {
        console.log('deleteRiskMaster raw response:', res); // TEMP: check actual shape in console, remove after confirming

        // Treat as failure only on explicit failure signals, not absence of a truthy `status`
        const isFailure =
          res?.status === false ||
          res?.success === false ||
          res?.error;

        if (isFailure) {
          throw new Error(res?.message || 'Delete failed');
        }
        return res?.data ?? res;
      }),
      tap(() => {
        this._notificationServices.success(
          'success',
          'Risk master record deleted successfully'
        );
      })
    );
  }

}
