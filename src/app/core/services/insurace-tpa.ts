import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsuranceTpaService {
  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl =
      environment.apiUrl +
      environment.middleware +
      environment.endpoints.insurancetpa +
      '/';
  }

  /* -------------------------------------------------------------------------- */
  /*                             Add Insurance/TPA                              */
  /* -------------------------------------------------------------------------- */

  public createInsuranceTPA(value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}add-tpa`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Insurance provider/TPA created successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Get All Insurance/TPAs                           */
  /* -------------------------------------------------------------------------- */

  public getAllInsuranceTPAs(showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getall-tpa`).pipe(
      map(res => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Insurance/TPAs fetched successfully'
          );
        }
      })
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Search Insurance/TPAs                            */
  /* -------------------------------------------------------------------------- */

  public searchInsuranceTPAs(
    searchText: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}search?q=${searchText}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Insurance/TPA search completed'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                        Get Insurance/TPA Statistics                         */
  /* -------------------------------------------------------------------------- */

  public getInsuranceTPAStatistics(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}statistics`).pipe(
      map(res => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Insurance/TPA statistics fetched successfully'
          );
        }
      })
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                        Get Insurance/TPA By Code                           */
  /* -------------------------------------------------------------------------- */

  public getInsuranceTPAByCode(
    code: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}code/${code}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Insurance/TPA details fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                         Get Insurance/TPA By Id                            */
  /* -------------------------------------------------------------------------- */

  public getInsuranceTPAById(
    tpaId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}${tpaId}`).pipe(
      map(res => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Insurance/TPA details fetched successfully'
          );
        }
      })
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Update Insurance/TPA                             */
  /* -------------------------------------------------------------------------- */

  public updateInsuranceTPA(
    tpaId: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}${tpaId}`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Insurance/TPA updated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                       Update Insurance/TPA Status                          */
  /* -------------------------------------------------------------------------- */

  public updateInsuranceTPAStatus(
    tpaId: string,
    status: 'Active' | 'Inactive' | 'Blacklisted' | 'Suspended',
    showNotification: boolean = true
  ): Observable<any> {
    return this._coreApiService
      .patch<any>(`${this.baseUrl}${tpaId}/status`, { status }, true)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              `Insurance/TPA marked as ${status}`
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                        Deactivate Insurance/TPA                            */
  /* -------------------------------------------------------------------------- */

  public deactivateInsuranceTPA(tpaId: string): Observable<any> {
    return this._coreApiService
      .patch<any>(`${this.baseUrl}${tpaId}/deactivate`, {}, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Insurance/TPA deactivated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                          Delete Insurance/TPA                              */
  /* -------------------------------------------------------------------------- */

  public deleteInsuranceTPA(tpaId: string): Observable<any> {
    return this._coreApiService
      .delete<any>(`${this.baseUrl}${tpaId}`)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Insurance/TPA deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Add Nodal Officer                               */
  /* -------------------------------------------------------------------------- */

  public addNodalOfficer(tpaId: string, value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}${tpaId}/nodal-officers`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Nodal officer added successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Remove Nodal Officer                             */
  /* -------------------------------------------------------------------------- */

  public removeNodalOfficer(
    tpaId: string,
    officerId: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(`${this.baseUrl}${tpaId}/nodal-officers/${officerId}`)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Nodal officer removed successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                        Update Contracted Tariff                            */
  /* -------------------------------------------------------------------------- */

  public updateContractedTariff(
    tpaId: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}${tpaId}/contracted-tariff`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Contracted tariff updated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                             Add TPA Document                               */
  /* -------------------------------------------------------------------------- */

  public addTPADocument(tpaId: string, value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}${tpaId}/documents`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Document added successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Remove TPA Document                              */
  /* -------------------------------------------------------------------------- */

  public removeTPADocument(
    tpaId: string,
    documentId: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(`${this.baseUrl}${tpaId}/documents/${documentId}`)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Document removed successfully'
          );
        })
      );
  }
}