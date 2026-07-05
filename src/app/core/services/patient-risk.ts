import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class PatientRiskService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.patientRisk + '/';
  }

  public getAllPatientRisk(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllPatientRisk').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `PatientRisk Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getPatientRiskById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPatientRiskById/${id}`).pipe(
      map((res: any) => res.data),
      tap((data: any) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PatientRisk details fetched successfully`
          );
        }
      })
    );
  }
  public getPatientRiskByPatientId(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPatientRiskByPatientId/${id}`).pipe(
      map((res: any) => res.data),
      tap((data: any) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PatientRisk details fetched successfully`
          );
        }
      })
    );
  }

  public createPatientRisk(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createPatientRisk', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `PatientRisk  created successfully`
        );
      })
    );
  }

  public updatePatientRisk(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updatePatientRisk/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'PatientRisk  updated successfully'
          );
        })
      );
  }
  // deletePatientRisk(id: string): Observable<any> {
  //   const url = `${this.baseUrl}deletePatientRisk/${id}`;
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
  //           'PatientRisk  deleted successfully'
  //         );
  //       })
  //     );
  // }
  public deletePatientRisk(id: string): Observable<any> {
    const url = `${this.baseUrl}deletePatientRisk/${id}`;
    return this._coreApiService.delete<any>(url).pipe(
      map((res: any) => {
        console.log('deletePatientRisk raw response:', res); // TEMP: check actual shape in console, remove after confirming

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
          'Patient risk record deleted successfully'
        );
      })
    );
  }
}
