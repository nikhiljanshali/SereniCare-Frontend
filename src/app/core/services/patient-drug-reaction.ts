import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class PatientDrugReactionService {
  private baseUrl: string = environment.apiUrl + environment.middleware + environment.endpoints.patientDrugReaction + '/';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
  }

  public getAllPatientDrugReaction(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllPatientDrugReaction').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `PatientDrugReaction Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getPatientDrugReactionById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPatientDrugReactionById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PatientDrugReaction details fetched successfully`
          );
        }
      })
    );
  }
  public getPatientDrugReactionByPatientId(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPatientDrugReactionByPatientId/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PatientDrugReaction details fetched successfully`
          );
        }
      })
    );
  }

  public createPatientDrugReaction(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createPatientDrugReaction', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `PatientDrugReaction  created successfully`
        );
      })
    );
  }

  public updatePatientDrugReaction(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updatePatientDrugReaction/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'PatientDrugReaction  updated successfully'
          );
        })
      );
  }
  // deletePatientDrugReaction(id: string): Observable<any> {
  //   const url = `${this.baseUrl}deletePatientDrugReaction/${id}`;
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
  //           'PatientDrugReaction  deleted successfully'
  //         );
  //       })
  //     );
  // }

  public deletePatientDrugReaction(id: string): Observable<any> {
    const url = `${this.baseUrl}deletePatientDrugReaction/${id}`;
    return this._coreApiService.delete<any>(url).pipe(
      map((res: any) => {
        console.log('deletePatientDrugReaction raw response:', res); // TEMP: check actual shape in console, remove after confirming

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
          'Patient drug reaction record deleted successfully'
        );
      })
    );
  }

}
