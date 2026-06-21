import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class AppointmentBookService {
  private baseUrl: string = '';

  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl =
      environment.apiUrl +
      environment.middleware +
      environment.endpoints.appointmentBooking +
      '/';
  }

  /**
   * Add Appointment Booking
   */
  public addAppointmentBooking(value: object): Observable<any> {
    return this._coreApiService.post<any>(`${this.baseUrl}addAppointmentBooking`, value, true).pipe(
      map((res) => res),
      tap(() => {
        this._notificationServices.success('Success', 'Appointment booked successfully');
      })
    );
  }

  /**
   * Update Appointment Booking
   */
  public updateAppointmentBooking(id: string, value: object): Observable<any> {
    return this._coreApiService.put<any>(`${this.baseUrl}updateAppointmentBooking/${id}`, value, true).pipe(
      map((res) => res),
      tap(() => {
        this._notificationServices.success(
          'Success',
          'Appointment updated successfully'
        );
      })
    );
  }

  /**
   * Delete Appointment Booking
   */
  public deleteAppointmentBooking(id: string): Observable<any> {
    return this._coreApiService.delete<any>(`${this.baseUrl}deleteAppointmentBooking/${id}`).pipe(
      map((res: any) => {
        if (!res?.success) {
          throw new Error(
            res?.message || 'Appointment delete failed'
          );
        }
        return res.data;
      }),
      tap(() => {
        this._notificationServices.success(
          'Success',
          'Appointment deleted successfully'
        );
      })
    );
  }

  /**
   * Get All Appointments
   */
  public getAllAppointmentBooking(showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getAllAppointmentBooking`).pipe(
      map((res) => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Appointments fetched successfully'
          );
        }
      })
    );
  }

  /**
   * Get Appointments By Doctor Id
   */
  public getAppointmentBookingByDoctorId(doctorId: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getAppointmentBookingById/${doctorId}`).pipe(
      map((res) => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Doctor appointments fetched successfully'
          );
        }
      })
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                      Doctor Availability For Booking                       */
  /* -------------------------------------------------------------------------- */

  /**
   * Get Doctor Availability By Day
   */
  public getDoctorAvailabilityByDay(
    doctorId: string,
    dayOfWeek: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getDoctorAvailabilityByDay/${doctorId}/${dayOfWeek}`
      )
      .pipe(
        map((res) => res.data),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor availability fetched successfully'
            );
          }
        })
      );
  }

  /**
   * Get Doctor Shifts By Day
   */
  public getDoctorShiftsByDay(
    doctorId: string,
    dayOfWeek: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getDoctorShiftsByDay/${doctorId}/${dayOfWeek}`
      )
      .pipe(
        map((res) => res.data),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor shifts fetched successfully'
            );
          }
        })
      );
  }

  /**
   * Get Doctor Slots By Day
   */
  public getDoctorSlotsByDay(doctorId: string, dayOfWeek: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getDoctorSlotsByDay/${doctorId}/${dayOfWeek}`).pipe(
      map((res) => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Doctor slots fetched successfully'
          );
        }
      })
    );
  }
  /**
  * Get Appointments By Doctor Id
  */
  public getAppointmentsByAppointmentId(appointmentId: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getAppointmentsByAppointmentId/${appointmentId}`).pipe(
      map((res) => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            'Doctor appointments fetched successfully'
          );
        }
      })
    );
  }

  public updateAppointmentStatus(appointmentId: string, appointmentStatus: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.put<any>(`${this.baseUrl}updateAppointmentStatus/${appointmentId}`, { appointmentStatus }).pipe(
      map((res) => res),
      tap(() => {
        if (showNotification) {
          this._notificationServices.success(
            'Success',
            `Appointment status updated to ${appointmentStatus}`
          );
        }
      })
    );
  }
}


