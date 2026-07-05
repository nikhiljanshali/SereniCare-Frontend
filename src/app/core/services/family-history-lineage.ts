import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class FamilyHistoryLineageService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.familyHistoryLineage + '/';
  }

  public getAllFamilyHistoryLineage(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllFamilyHistoryLineage').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `FamilyHistoryLineage Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getFamilyHistoryLineageById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getFamilyHistoryLineageById/${id}`).pipe(
      map((res: any) => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `FamilyHistoryLineage details fetched successfully`
          );
        }
      })
    );
  }
  public getFamilyHistoryLineageByPatientId(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getFamilyHistoryLineageByPatientId/${id}`).pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `FamilyHistoryLineage details fetched successfully`
          );
        }
      })
    );
  }

  public createFamilyHistoryLineage(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createFamilyHistoryLineage  ', value, true).pipe(
      map((res: any) => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `FamilyHistoryLineage created successfully`
        );
      })
    );
  }

  public updateFamilyHistoryLineage(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateFamilyHistoryLineage/${id}`, value, true)
      .pipe(
        map((res: any) => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'FamilyHistoryLineage updated successfully'
          );
        })
      );
  }
  // deleteFamilyHistoryLineage(id: string): Observable<any> {
  //   const url = `${this.baseUrl}deleteFamilyHistoryLineage/${id}`;
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
  //           'FamilyHistoryLineage deleted successfully'
  //         );
  //       })
  //     );
  // }

  public deleteFamilyHistoryLineage(id: string): Observable<any> {
    const url = `${this.baseUrl}deleteFamilyHistoryLineage/${id}`;
    return this._coreApiService.delete<any>(url).pipe(
      map((res: any) => {
        console.log('deleteFamilyHistoryLineage raw response:', res); // TEMP: check actual shape in console, remove after confirming

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
