import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';
import { Observable, map, tap } from 'rxjs';
import { IServicePackage, IServiceTariff } from '../interface/basic.interface';

@Injectable({
  providedIn: 'root',
})
export class MedicalServices {
  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl =
      environment.apiUrl +
      environment.middleware +
      environment.endpoints.medicalservices +
      '/';
  }


  /* -------------------------------------------------------------------------- */
  /*                             Add Service                                    */
  /* -------------------------------------------------------------------------- */

  public createService(value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}addservices`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service created successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Update Service                                  */
  /* -------------------------------------------------------------------------- */

  public updateService(serviceId: string, value: object): Observable<any> {
    return this._coreApiService.put<any>(`${this.baseUrl}${serviceId}`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service updated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Delete Service                                  */
  /* -------------------------------------------------------------------------- */

  public deleteService(
    serviceId: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}${serviceId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Get All Services                                 */
  /* -------------------------------------------------------------------------- */

  public getAllServices(showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getallservices`).pipe(
      map(res => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Services fetched successfully'
          );
        }
      })
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                          Get Service By Id                                 */
  /* -------------------------------------------------------------------------- */

  public getServiceById(
    serviceId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}${serviceId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Service details fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Search Services                                 */
  /* -------------------------------------------------------------------------- */

  public searchServices(
    searchText: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}search?q=${searchText}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Service search completed'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                        Get Service Statistics                              */
  /* -------------------------------------------------------------------------- */

  public getServiceStatistics(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}statistics`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Service statistics fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                        Update Service Status                               */
  /* -------------------------------------------------------------------------- */

  public updateServiceStatus(
    serviceId: string,
    status: 'Active' | 'Inactive' | 'Discontinued',
    showNotification: boolean = true
  ): Observable<any> {
    return this._coreApiService
      .patch<any>(
        `${this.baseUrl}${serviceId}/status`,
        { status },
        true
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              `Service marked as ${status}`
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                         Deactivate Service                                 */
  /* -------------------------------------------------------------------------- */

  public deactivateService(serviceId: string): Observable<any> {
    return this._coreApiService
      .patch<any>(
        `${this.baseUrl}${serviceId}/deactivate`,
        {},
        true
      )
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service deactivated successfully'
          );
        })
      );
  }

  // /* -------------------------------------------------------------------------- */
  // /*                         Add Service Tariff                                 */
  // /* -------------------------------------------------------------------------- */

  public createTariff(value: IServiceTariff): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}tariffs`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service tariff created successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Update Service Tariff                           */
  /* -------------------------------------------------------------------------- */

  public updateTariff(tariffId: string, value: Partial<IServiceTariff>): Observable<any> {
    return this._coreApiService.put<any>(
      `${this.baseUrl}tariffs/${tariffId}`, value, true
    )
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service tariff updated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Delete Service Tariff                           */
  /* -------------------------------------------------------------------------- */

  public deleteTariff(
    tariffId: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}tariffs/${tariffId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service tariff deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Get Tariff By ID                                 */
  /* -------------------------------------------------------------------------- */

  public getTariffById(
    tariffId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}${tariffId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Tariff details fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                       Get Tariffs By Service ID                            */
  /* -------------------------------------------------------------------------- */

  public getTariffsByServiceId(
    serviceId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}service/${serviceId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Service tariffs fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                      Get Tariffs By Provider ID                            */
  /* -------------------------------------------------------------------------- */

  public getTariffsByProviderId(
    providerId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}provider/${providerId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Provider tariffs fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Search Service Tariffs                           */
  /* -------------------------------------------------------------------------- */

  public searchTariffs(
    searchText: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}search?q=${searchText}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Tariff search completed'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Get All Service Tariffs                          */
  /* -------------------------------------------------------------------------- */

  /**
   * Fetch all service tariffs with optional active filtering and pagination
   * @param params Optional query filters (onlyActive, limit, skip)
   * @param showNotification Boolean flag to trigger success toast notification
   */
  public getAllTariffs(
    params?: { onlyActive?: boolean; limit?: number; skip?: number },
    showNotification: boolean = false
  ): Observable<any> {
    const queryParams: string[] = [];

    if (params?.onlyActive !== undefined) {
      queryParams.push(`onlyActive=${params.onlyActive}`);
    }
    if (params?.limit !== undefined) {
      queryParams.push(`limit=${params.limit}`);
    }
    if (params?.skip !== undefined) {
      queryParams.push(`skip=${params.skip}`);
    }

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    return this._coreApiService
      .get<any>(`${this.baseUrl}tariffs/all${queryString}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'All service tariffs fetched successfully'
            );
          }
        })
      );
  }


  public getTariffsStatistics(showNotification: boolean = false): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}tstatistics`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Service statistics fetched successfully'
            );
          }
        })
      );
  }


  /* -------------------------------------------------------------------------- */
  /*                           Create Service Package                           */
  /* -------------------------------------------------------------------------- */

  public createPackage(value: IServicePackage): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}createpackage`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service package created successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Update Service Package                           */
  /* -------------------------------------------------------------------------- */

  public updatePackage(
    packageId: string,
    value: Partial<IServicePackage>
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}${packageId}`,
        value,
        true
      )
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service package updated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Delete Service Package                           */
  /* -------------------------------------------------------------------------- */

  public deletePackage(
    packageId: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}${packageId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Service package deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                          Get All Service Packages                          */
  /* -------------------------------------------------------------------------- */

  public getAllPackages(
    params?: { onlyActive?: boolean; limit?: number; skip?: number },
    showNotification: boolean = false
  ): Observable<any> {
    const queryParams: string[] = [];

    if (params?.onlyActive !== undefined) {
      queryParams.push(`onlyActive=${params.onlyActive}`);
    }
    if (params?.limit !== undefined) {
      queryParams.push(`limit=${params.limit}`);
    }
    if (params?.skip !== undefined) {
      queryParams.push(`skip=${params.skip}`);
    }

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    console.log(`${this.baseUrl}allpackages${queryString}`);
    return this._coreApiService
      .get<any>(`${this.baseUrl}allpackages${queryString}`)
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Service packages fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                          Get Package By ID                                 */
  /* -------------------------------------------------------------------------- */

  public getPackageById(
    packageId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}${packageId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Service package details fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                         Get Package By Code                                */
  /* -------------------------------------------------------------------------- */

  public getPackageByCode(
    packageCode: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}code/${packageCode}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Package details fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                          Search Service Packages                           */
  /* -------------------------------------------------------------------------- */

  public searchPackages(
    searchText: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}search?q=${searchText}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Service packages search completed'
            );
          }
        })
      );
  }
  public getPackageStatistics(showNotification: boolean = false): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}pstatistics`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Service statistics fetched successfully'
            );
          }
        })
      );
  }
}


