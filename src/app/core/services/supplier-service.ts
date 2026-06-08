import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {

  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl =
      environment.apiUrl +
      environment.middleware +
      environment.endpoints.supplier +
      '/';
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CRUD APIs                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Add Supplier
   */
  public addSupplier(value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}suppliers`, value, true)
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Supplier created successfully'
          );
        })
      );
  }

  /**
   * Get All Suppliers
   */
  public getAllSuppliers(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}suppliers`)
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Suppliers fetched successfully'
            );
          }
        })
      );
  }

  /**
   * Get Supplier By Id
   */
  public getSupplierById(
    supplierId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}suppliers/${supplierId}`)
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Supplier fetched successfully'
            );
          }
        })
      );
  }

  /**
   * Update Supplier
   */
  public updateSupplier(
    supplierId: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}suppliers/${supplierId}`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Supplier updated successfully'
          );
        })
      );
  }

  /**
   * Delete Supplier
   */
  public deleteSupplier(
    supplierId: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}suppliers/${supplierId}`
      )
      .pipe(
        map((res: any) => {
          if (!res?.success) {
            throw new Error(
              res?.message || 'Supplier delete failed'
            );
          }
          return res.data;
        }),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Supplier deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                              Supplier Status                               */
  /* -------------------------------------------------------------------------- */

  /**
   * Update Supplier Status
   */
  public updateSupplierStatus(
    supplierId: string,
    status: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .patch<any>(
        `${this.baseUrl}suppliers/${supplierId}/status`,
        { status }
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              `Supplier status updated to ${status}`
            );
          }
        })
      );
  }

  /**
   * Deactivate Supplier
   */
  public deactivateSupplier(
    supplierId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .patch<any>(
        `${this.baseUrl}suppliers/${supplierId}/deactivate`,
        {}
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Supplier deactivated successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                                Search APIs                                 */
  /* -------------------------------------------------------------------------- */

  /**
   * Search Suppliers
   */
  public searchSuppliers(
    searchText: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}suppliers/search?q=${encodeURIComponent(searchText)}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Search completed successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                             Supplier Utilities                             */
  /* -------------------------------------------------------------------------- */

  /**
   * Get Supplier By Auth User Id
   */
  public getSupplierByAuthUserId(
    authUserId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}suppliers/auth-user/${authUserId}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Supplier fetched successfully'
            );
          }
        })
      );
  }

  /**
   * Get Supplier Statistics
   */
  public getSupplierStatistics(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}suppliers/statistics`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Statistics fetched successfully'
            );
          }
        })
      );
  }
}