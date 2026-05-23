import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { StorageOperation } from './storage-operation';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

  private baseUrl: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices,
    private _storageOperation: StorageOperation
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.patients + '/';
  }

  public getPatients(showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllPatients').pipe(
      map(res => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Patients fetched successfully'
          );
        }
      })
    );
  }

  public getPatientById(id: string): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPatientById/${id}`).pipe(
      map(res => res.data)
    );
  }

  public createPatient(payload: any): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createPatient', payload).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'Success',
          `Patient ${data.firstName} ${data.lastName} created successfully`
        );
      })
    );
  }


  public updatePatient(id: string, payload: any): Observable<any> {
    return this._coreApiService.put<any>(`${this.baseUrl}updatePatient/${id}`, payload).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'Success',
          `Patient ${data.firstName} ${data.lastName} updated successfully`
        );
      })
    );
  }

  public deletePatient(id: string): Observable<any> {
    return this._coreApiService.delete<any>(`${this.baseUrl}deletePatient/${id}`).pipe(
      map(res => res.data),
      tap(() => {
        this._notificationServices.success(
          'Success',
          'Patient deleted successfully'
        );
      })
    );
  }
}
