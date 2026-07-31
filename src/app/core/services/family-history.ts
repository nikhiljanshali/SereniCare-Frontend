import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class FamilyHistoryService {
  private baseUrl: string = environment.apiUrl + environment.middleware + environment.endpoints.familyHistory + '/';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
  }

  public getAllFamilyHistory(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllFamilyHistory').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `FamilyHistory Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getFamilyHistoryById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getFamilyHistoryById/${id}`).pipe(
      map((res: any) => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `FamilyHistory details fetched successfully`
          );
        }
      })
    );
  }
  public getFamilyHistoryByPatientId(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getFamilyHistoryByPatientId/${id}`).pipe(
      map((res: any) => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `FamilyHistory details fetched successfully`
          );
        }
      })
    );
  }

  public createFamilyHistory(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createFamilyHistory', value, true).pipe(
      map((res: any) => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `FamilyHistory  created successfully`
        );
      })
    );
  }

  public updateFamilyHistory(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateFamilyHistory/${id}`, value, true)
      .pipe(
        map((res: any) => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'FamilyHistory  updated successfully'
          );
        })
      );
  }
  // deleteFamilyHistory(id: string): Observable<any> {
  //   const url = `${this.baseUrl}deleteFamilyHistory/${id}`;
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
  //           'FamilyHistory  deleted successfully'
  //         );
  //       })
  //     );
  // }

  public deleteFamilyHistory(id: string): Observable<any> {
    const url = `${this.baseUrl}deleteFamilyHistory/${id}`;
    return this._coreApiService.delete<any>(url).pipe(
      map((res: any) => {
        console.log('deleteFamilyHistory raw response:', res); // TEMP: check actual shape in console, remove after confirming

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
          'Family history record deleted successfully'
        );
      })
    );
  }

}
