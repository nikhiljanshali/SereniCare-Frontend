import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class PatientAllergiesService {
  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.patientAllergies + '/';
  }

  public getAllPatientAllergies(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllPatientAllergies').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `PatientAllergies Data Fetch Successfully`
          );
        }
      })
    );
  }

  public getPatientAllergiesById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPatientAllergiesById/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PatientAllergies details fetched successfully`
          );
        }
      })
    );
  }
  public getPatientAllergiesByPatientId(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPatientAllergiesByPatientId/${id}`).pipe(
      map(res => res.data),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `PatientAllergies details fetched successfully`
          );
        }
      })
    );
  }

  public createPatientAllergies(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createPatientAllergies', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `PatientAllergies  created successfully`
        );
      })
    );
  }

  public updatePatientAllergies(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updatePatientAllergies/${id}`, value, true)
      .pipe(
        map(res => res.data),
        tap(() => {
          this._notificationServices.success(
            'success',
            'PatientAllergies  updated successfully'
          );
        })
      );
  }
  // deletePatientAllergies(id: string): Observable<any> {
  //   const url = `${this.baseUrl}deletePatientAllergies/${id}`;
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
  //           'PatientAllergies  deleted successfully'
  //         );
  //       })
  //     );
  // }

  public deletePatientAllergies(id: string): Observable<any> {
    const url = `${this.baseUrl}deletePatientAllergies/${id}`;
    return this._coreApiService.delete<any>(url).pipe(
      map((res: any) => {
        console.log('deletePatientAllergies raw response:', res); // TEMP: check actual shape in console, remove after confirming

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
          'Patient allergies record deleted successfully'
        );
      })
    );
  }

}
