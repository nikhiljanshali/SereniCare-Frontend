import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacilityTypeServices {
  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl =
      environment.apiUrl +
      environment.middleware +
      environment.endpoints.facilityType +
      '/';
  }

  /* -------------------------------------------------------------------------- */
  /*                            Create Facility Type                            */
  /* -------------------------------------------------------------------------- */

  public createFacilityType(value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}createfacilityType`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Facility type created successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Update Facility Type                            */
  /* -------------------------------------------------------------------------- */

  public updateFacilityType(id: string, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updatefacilityType/${id}`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Facility type updated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Delete Facility Type                            */
  /* -------------------------------------------------------------------------- */

  public deleteFacilityType(id: string): Observable<any> {
    return this._coreApiService
      .delete<any>(`${this.baseUrl}deletefacilityType/${id}`)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Facility type deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Get All Facility Types                           */
  /* -------------------------------------------------------------------------- */

  public getAllFacilityTypes(
    params?: { page?: number; limit?: number },
    showNotification: boolean = false
  ): Observable<any> {
    const queryParams: string[] = [];

    if (params?.page !== undefined) {
      queryParams.push(`page=${params.page}`);
    }
    if (params?.limit !== undefined) {
      queryParams.push(`limit=${params.limit}`);
    }

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    return this._coreApiService
      .get<any>(`${this.baseUrl}getAllfacilityTypes${queryString}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Facility types fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Get Facility Type By Id                          */
  /* -------------------------------------------------------------------------- */

  public getFacilityTypeById(
    id: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getfacilityTypeById/${id}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Facility type details fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get All Categories                            */
  /* -------------------------------------------------------------------------- */

  public getAllCategories(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getAllCategories`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Categories fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                         Get Facilities By Category                         */
  /* -------------------------------------------------------------------------- */

  public getFacilitiesByCategory(
    category: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getFacilitiesByCategory/${encodeURIComponent(category)}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Facilities by category fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                       Get Sub-Facilities By Facility                       */
  /* -------------------------------------------------------------------------- */

  public getSubFacilitiesByFacility(
    facilityName: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getSubFacilitiesByFacility/${encodeURIComponent(facilityName)}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Sub-facilities fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Get All Facility Names                          */
  /* -------------------------------------------------------------------------- */

  public getAllFacilities(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getAllFacilities`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Facility names fetched successfully'
            );
          }
        })
      );
  }

  public getSubFacilitiesByFacilityName(
    facilityName: string,
    showNotification: boolean = false
  ): Observable<any> {
    const encodedName = encodeURIComponent(facilityName);

    return this._coreApiService
      .get<any>(`${this.baseUrl}${encodedName}/sub-facilities`)
      .pipe(
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Sub-facilities fetched successfully'
            );
          }
        })
      );
  }
}

