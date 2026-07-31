import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhysicalExamination {
  private baseUrl: string = environment.apiUrl + environment.middleware + environment.endpoints.physicalExamination + '/';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) { }

  /**
   * Get All Physical Examinations
   */
  public getAllPhysicalExaminations(showNotification: boolean = false): Observable<any> {
    return this._coreApiService
      .get<any>(this.baseUrl + 'getAllPhysicalExaminations')
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Physical Examination data fetched successfully'
            );
          }
        })
      );
  }

  /**
   * Get Physical Examination By Id
   */
  public getPhysicalExaminationById(id: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPhysicalExaminationById/${id}`).pipe(map((res: any) => res.data), tap(() => {
      if (showNotification) {
        this._notificationServices.success(
          'Success',
          'Physical Examination details fetched successfully'
        );
      }
    }));
  }

  /**
   * Get Physical Examination By Patient Id
   */
  public getPhysicalExaminationByPatientId(id: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getPhysicalExaminationByPatientId/${id}`).pipe(map(res => res), tap(() => {
      if (showNotification) {
        this._notificationServices.success(
          'Success',
          'Physical Examination details fetched successfully'
        );
      }
    }));
  }

  /**
   * Create Physical Examination
   */
  public createPhysicalExamination(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createPhysicalExamination', value, true).pipe(map((res: any) => res.data), tap(() => {
      this._notificationServices.success(
        'Success',
        'Physical Examination created successfully'
      );
    }));
  }

  /**
   * Update Physical Examination
   */
  public updatePhysicalExamination(id: string | number, value: object): Observable<any> {
    return this._coreApiService.put<any>(`${this.baseUrl}updatePhysicalExamination/${id}`, value, true).pipe(map((res: any) => res.data), tap(() => {
      this._notificationServices.success(
        'Success',
        'Physical Examination updated successfully'
      );
    }));
  }

  /**
   * Delete Physical Examination
   */
  public deletePhysicalExamination(id: string): Observable<any> {
    const url = `${this.baseUrl}deletePhysicalExamination/${id}`;
    return this._coreApiService.delete<any>(url).pipe(map((res: any) => {
      const isFailure =
        res?.status === false ||
        res?.success === false ||
        res?.error;
      if (isFailure) {
        throw new Error(res?.message || 'Delete failed');
      }
      return res?.data ?? res;
    }), tap(() => {
      this._notificationServices.success(
        'Success',
        'Physical Examination deleted successfully'
      );
    }));
  }
}
