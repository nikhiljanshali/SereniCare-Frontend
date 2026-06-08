import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl =
      environment.apiUrl +
      environment.middleware +
      environment.endpoints.prescription +
      '/';
  }

  /* -------------------------------------------------------------------------- */
  /*                           Add Prescription                                 */
  /* -------------------------------------------------------------------------- */

  public createPrescription(value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}addPrescription`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Prescription added successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                          Update Prescription                               */
  /* -------------------------------------------------------------------------- */

  public updatePrescription(
    prescriptionId: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}updatePrescription/${prescriptionId}`,
        value,
        true
      )
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Prescription updated successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                          Delete Prescription                               */
  /* -------------------------------------------------------------------------- */

  public deletePrescription(
    prescriptionId: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}deletePrescription/${prescriptionId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Prescription deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                        Get All Prescriptions                               */
  /* -------------------------------------------------------------------------- */

  public getAllPrescriptions(showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getAllPrescriptions`).pipe(
      map(res => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Prescriptions fetched successfully'
          );
        }
      })
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                       Get Prescription By Id                               */
  /* -------------------------------------------------------------------------- */

  public getPrescriptionById(
    prescriptionId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getPrescriptionById/${prescriptionId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Prescription details fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                         Search Prescription                                */
  /* -------------------------------------------------------------------------- */

  public searchPrescription(
    searchText: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}searchPrescription/${searchText}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Prescription search completed'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                       Get By Patient Id                                    */
  /* -------------------------------------------------------------------------- */

  public getPrescriptionsByPatient(
    patientId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getPrescriptionsByPatient/${patientId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Patient prescriptions fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                       Get By Doctor Id                                     */
  /* -------------------------------------------------------------------------- */

  public getPrescriptionsByDoctor(
    doctorId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getPrescriptionsByDoctor/${doctorId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor prescriptions fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                     Get By Appointment Id                                  */
  /* -------------------------------------------------------------------------- */

  public getPrescriptionByAppointment(
    appointmentId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getPrescriptionByAppointment/${appointmentId}`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Appointment prescription fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                         Get Draft Prescriptions                            */
  /* -------------------------------------------------------------------------- */

  public getDraftPrescriptions(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getDraftPrescriptions`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Draft prescriptions fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                       Get Completed Prescriptions                          */
  /* -------------------------------------------------------------------------- */

  public getCompletedPrescriptions(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getCompletedPrescriptions`
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Completed prescriptions fetched successfully'
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                     Update Prescription Status                             */
  /* -------------------------------------------------------------------------- */

  public updatePrescriptionStatus(
    prescriptionId: string,
    status: 'Draft' | 'Completed' | 'Cancelled',
    showNotification: boolean = true
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}updatePrescriptionStatus/${prescriptionId}`,
        { status },
        true
      )
      .pipe(
        map(res => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              `Prescription marked as ${status}`
            );
          }
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                     Cancel Prescription                                    */
  /* -------------------------------------------------------------------------- */

  public cancelPrescription(prescriptionId: string): Observable<any> {
    return this.updatePrescriptionStatus(prescriptionId, 'Cancelled');
  }
}