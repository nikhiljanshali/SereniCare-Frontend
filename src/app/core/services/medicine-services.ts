import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {

  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl =
      environment.apiUrl +
      environment.middleware +
      environment.endpoints.medicine +
      '/';
  }

  /**
 * Bulk Import Medicines
 */
  public importMedicines(medicines: any[], showNotification: boolean = true): Observable<any> {
    return this._coreApiService.post<any>(`${this.baseUrl}bulkMedicineImport`, medicines, true).pipe(
      map((res) => res),
      tap((res) => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            `Medicines imported successfully`
          );
        }
      })
    );
  }
  /* -------------------------------------------------------------------------- */
  /*                               Add Medicine                                 */
  /* -------------------------------------------------------------------------- */

  public addMedicine(value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}addMedicine`, value, true)
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Medicine added successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                             Update Medicine                                */
  /* -------------------------------------------------------------------------- */

  public updateMedicine(
    medicineId: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}updateMedicine/${medicineId}`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Medicine updated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                             Delete Medicine                                */
  /* -------------------------------------------------------------------------- */

  public deleteMedicine(medicineId: string): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}deleteMedicine/${medicineId}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Medicine deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Get All Medicines                               */
  /* -------------------------------------------------------------------------- */

  public getAllMedicines(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getAllMedicines`)
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Medicines fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Get Medicine By Id                               */
  /* -------------------------------------------------------------------------- */

  public getMedicineById(
    medicineId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getMedicineById/${medicineId}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Medicine details fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                              Search Medicine                               */
  /* -------------------------------------------------------------------------- */

  public searchMedicine(
    searchText: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}searchMedicine/${searchText}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Medicine search completed'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                        Get Medicines By Category                           */
  /* -------------------------------------------------------------------------- */

  public getMedicinesByCategory(
    category: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getMedicinesByCategory/${category}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              `${category} medicines fetched successfully`
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Get Active Medicines                             */
  /* -------------------------------------------------------------------------- */

  public getActiveMedicines(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getActiveMedicines`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Active medicines fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                       Get Prescription Medicines                           */
  /* -------------------------------------------------------------------------- */

  public getPrescriptionMedicines(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getPrescriptionMedicines`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Prescription medicines fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                         Update Medicine Status                             */
  /* -------------------------------------------------------------------------- */

  public updateMedicineStatus(
    medicineId: string,
    isActive: boolean,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}updateMedicineStatus/${medicineId}`,
        { isActive }
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              `Medicine ${isActive ? 'activated' : 'deactivated'
              } successfully`
            );
          }
        })
      );
  }
}