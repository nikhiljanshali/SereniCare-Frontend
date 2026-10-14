import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { IFacilityFilterParams } from '../interface/basic.interface';

@Injectable({
  providedIn: 'root',
})
export class FacilityServices {
  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl =
      environment.apiUrl +
      environment.middleware +
      environment.endpoints.facility +
      '/';
  }

  /* -------------------------------------------------------------------------- */
  /*                               Create Facility                              */
  /* -------------------------------------------------------------------------- */

  public createFacility(value: object): Observable<any> {
    // Router: router.post("/create", facilityController.create);
    return this._coreApiService
      .post<any>(`${this.baseUrl}create`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Facility created successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                               Update Facility                              */
  /* -------------------------------------------------------------------------- */

  public updateFacility(facilityId: string, value: object): Observable<any> {
    // Router: router.put("/update/:id", facilityController.update);
    return this._coreApiService
      .put<any>(`${this.baseUrl}update/${facilityId}`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Facility updated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                               Delete Facility                              */
  /* -------------------------------------------------------------------------- */

  public deleteFacility(facilityId: string): Observable<any> {
    // Router: router.delete("/delete/:id", facilityController.delete);
    return this._coreApiService
      .delete<any>(`${this.baseUrl}delete/${facilityId}`)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Facility deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get All Facilities                            */
  /* -------------------------------------------------------------------------- */

  public getAllFacilities(
    params?: { page?: number; limit?: number },
    showNotification: boolean = false
  ): Observable<any> {
    // Router: router.get("/getAll", facilityController.getAll);
    const queryParams: string[] = [];
    if (params?.page !== undefined) {
      queryParams.push(`page=${params.page}`);
    }
    if (params?.limit !== undefined) {
      queryParams.push(`limit=${params.limit}`);
    }
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    return this._coreApiService
      .get<any>(`${this.baseUrl}getAll${queryString}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Facilities fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Facility By Id                            */
  /* -------------------------------------------------------------------------- */

  public getFacilityById(
    facilityId: string,
    showNotification: boolean = false
  ): Observable<any> {
    // Router: router.get("/getBy/:id", facilityController.getById);
    return this._coreApiService
      .get<any>(`${this.baseUrl}getBy/${facilityId}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Facility details fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Get Facilities By Patient Id                     */
  /* -------------------------------------------------------------------------- */

  public getFacilitiesByPatientId(
    patientId: string,
    showNotification: boolean = false
  ): Observable<any> {
    // Router: router.get("/patient/:patientId", facilityController.getByPatientId);
    return this._coreApiService
      .get<any>(`${this.baseUrl}patient/${patientId}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Patient facilities fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                             Search & Filter Facilities                     */
  /* -------------------------------------------------------------------------- */

  public searchAndFilterFacilities(
    filterParams?: IFacilityFilterParams,
    showNotification: boolean = false
  ): Observable<any> {
    // Router: router.get("/search", facilityController.searchAndFilter);
    const queryParams: string[] = [];

    if (filterParams?.search) {
      queryParams.push(`search=${encodeURIComponent(filterParams.search)}`);
    }
    if (filterParams?.type) {
      queryParams.push(`type=${encodeURIComponent(filterParams.type)}`);
    }
    if (filterParams?.subType) {
      queryParams.push(`subType=${encodeURIComponent(filterParams.subType)}`);
    }
    if (filterParams?.status) {
      queryParams.push(`status=${filterParams.status}`);
    }
    if (filterParams?.building) {
      queryParams.push(`building=${encodeURIComponent(filterParams.building)}`);
    }
    if (filterParams?.floor !== undefined) {
      queryParams.push(`floor=${filterParams.floor}`);
    }
    if (filterParams?.is24x7 !== undefined) {
      queryParams.push(`is24x7=${filterParams.is24x7}`);
    }
    if (filterParams?.page !== undefined) {
      queryParams.push(`page=${filterParams.page}`);
    }
    if (filterParams?.limit !== undefined) {
      queryParams.push(`limit=${filterParams.limit}`);
    }

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    return this._coreApiService
      .get<any>(`${this.baseUrl}search${queryString}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Facility search completed successfully'
            );
          }
        })
      );
  }
}