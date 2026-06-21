import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoreApiService } from './core-api-service';
import { NotificationServices } from './notification-services';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {

  private baseUrl: string = '';
  private baseUrlExt: string = '';
  private baseUrlVital: string = '';
  constructor(
    private _coreApiService: CoreApiService,
    private _notificationServices: NotificationServices
  ) {
    this.baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.doctors + '/';
    this.baseUrlExt = environment.apiUrl + environment.middleware + environment.endpoints.chiefComplaint + '/';
    this.baseUrlVital = environment.apiUrl + environment.middleware + environment.endpoints.vitals + '/';
  }

  /* -------------------------------------------------------------------------- */
  /*                            Doctor Methods                            */
  /* -------------------------------------------------------------------------- */
  public getAllDoctors(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllDoctors').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Doctors Data Fetch Successfully`
          );
        }
      })
    );
  }
  public getAllLimitedDoctors(showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(this.baseUrl + 'getAllDoctorsLimited').pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'success',
            `Doctors Data Fetch Successfully`
          );
        }
      })
    );
  }
  public getDoctorsById(id: string, showNotificaion: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrl}getDoctorById/${id}`).pipe(
      map(res => res),
      tap((data) => {
        if (showNotificaion) {
          this._notificationServices.success(
            'Success',
            `Doctors details fetched successfully`
          );
        }
      })
    );
  }
  public createDoctors(value: object): Observable<any> {
    return this._coreApiService.post<any>(this.baseUrl + 'createDoctor', value, true).pipe(
      map(res => res.data),
      tap((data) => {
        this._notificationServices.success(
          'success',
          `Doctors  created successfully`
        );
      })
    );
  }
  public updateDoctors(id: string | number, value: object): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateDoctor/${id}`, value, true)
      .pipe(
        map(res => res),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Doctors  updated successfully'
          );
        })
      );
  }
  public deleteDoctors(id: string): Observable<any> {
    const url = `${this.baseUrl}deleteDoctor/${id}`;
    return this._coreApiService
      .delete<any>(url)
      .pipe(
        map((res: any) => {
          if (!res?.status) {
            throw new Error(res?.message || 'Delete failed');
          }
          return res.data;
        }),
        tap(() => {
          this._notificationServices.success(
            'success',
            'Doctors  deleted successfully'
          );
        })
      );
  }

  /* -------------------------------------------------------------------------- */
  /*                            Doctor Leave Methods                            */
  /* -------------------------------------------------------------------------- */
  /**
   * Add Doctor Leave
   */
  public addDoctorLeave(value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}addLeave`, value, true)
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor leave added successfully'
          );
        })
      );
  }
  /**
   * Update Doctor Leave
   */
  public updateDoctorLeave(
    id: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateLeave/${id}`, value, true)
      .pipe(
        map((res) => res.data),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor leave updated successfully'
          );
        })
      );
  }
  /**
   * Delete Doctor Leave
   */
  public deleteDoctorLeave(id: string): Observable<any> {
    return this._coreApiService
      .delete<any>(`${this.baseUrl}deleteLeave/${id}`)
      .pipe(
        map((res: any) => {
          if (!res?.success) {
            throw new Error(res?.message || 'Delete failed');
          }
          return res.data;
        }),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor leave deleted successfully'
          );
        })
      );
  }
  /**
   * Get All Doctor Leaves
   */
  public getAllDoctorLeaves(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getAllLeaves`)
      .pipe(
        map((res) => res.data),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor leave list fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Leave By Leave Id
   */
  public getDoctorLeaveById(
    id: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getLeaveById/${id}`)
      .pipe(
        map((res) => res.data),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor leave details fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Leaves By Doctor Id
   */
  public getDoctorLeavesByDoctorId(
    doctorId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getLeavesByDoctor/${doctorId}`)
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor leave list fetched successfully'
            );
          }
        })
      );
  }
  /* -------------------------------------------------------------------------- */
  /*                         Doctor Education Methods                            */
  /* -------------------------------------------------------------------------- */
  /**
   * Add Doctor Education
   */
  public addDoctorEducation(value: object): Observable<any> {
    return this._coreApiService
      .post<any>(`${this.baseUrl}addEducation`, value, true)
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor education added successfully'
          );
        })
      );
  }
  /**
   * Update Doctor Education
   */
  public updateDoctorEducation(
    id: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(`${this.baseUrl}updateEducation/${id}`, value, true)
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor education updated successfully'
          );
        })
      );
  }
  /**
   * Delete Doctor Education
   */
  public deleteDoctorEducation(id: string): Observable<any> {
    return this._coreApiService
      .delete<any>(`${this.baseUrl}deleteEducation/${id}`)
      .pipe(
        map((res: any) => {
          if (!res?.success) {
            throw new Error(
              res?.message || 'Doctor education delete failed'
            );
          }

          return res;
        }),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor education deleted successfully'
          );
        })
      );
  }
  /**
   * Get All Doctor Education
   */
  public getAllDoctorEducation(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getAllEducation`)
      .pipe(
        map((res) => res.data),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor education list fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Education By Id
   */
  public getDoctorEducationById(
    id: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(`${this.baseUrl}getEducationById/${id}`)
      .pipe(
        map((res) => res.data),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor education details fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Education By Doctor Id
   */
  public getDoctorEducationByDoctorId(
    doctorId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getEducationByDoctor/${doctorId}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor education list fetched successfully'
            );
          }
        })
      );
  }
  /* -------------------------------------------------------------------------- */
  /*                    Doctor Work Experience Methods                           */
  /* -------------------------------------------------------------------------- */
  /**
   * Add Doctor Work Experience
   */
  public addDoctorWorkExperience(
    value: object
  ): Observable<any> {
    return this._coreApiService
      .post<any>(
        `${this.baseUrl}addWorkExperience`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor work experience added successfully'
          );
        })
      );
  }
  /**
   * Update Doctor Work Experience
   */
  public updateDoctorWorkExperience(
    id: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}updateWorkExperience/${id}`,
        value,
        true
      )
      .pipe(
        map((res) => res.data),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor work experience updated successfully'
          );
        })
      );
  }
  /**
   * Delete Doctor Work Experience
   */
  public deleteDoctorWorkExperience(
    id: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}deleteWorkExperience/${id}`
      )
      .pipe(
        map((res: any) => {
          if (!res?.success) {
            throw new Error(
              res?.message ||
              'Doctor work experience delete failed'
            );
          }

          return res.data;
        }),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor work experience deleted successfully'
          );
        })
      );
  }
  /**
   * Get All Doctor Work Experience
   */
  public getAllDoctorWorkExperience(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getAllWorkExperience`
      )
      .pipe(
        map((res) => res.data),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor work experience list fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Work Experience By Id
   */
  public getDoctorWorkExperienceById(
    id: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getWorkExperienceById/${id}`
      )
      .pipe(
        map((res) => res.data),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor work experience fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Work Experience By Doctor Id
   */
  public getDoctorWorkExperienceByDoctorId(
    doctorId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getWorkExperienceByDoctor/${doctorId}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor work experience list fetched successfully'
            );
          }
        })
      );
  }
  /* -------------------------------------------------------------------------- */
  /*                     Doctor Certification Methods                            */
  /* -------------------------------------------------------------------------- */
  /**
   * Add Doctor Certification
   */
  public addDoctorCertification(
    value: object
  ): Observable<any> {
    return this._coreApiService
      .post<any>(
        `${this.baseUrl}addDoctorCertification`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor certification added successfully'
          );
        })
      );
  }
  /**
   * Update Doctor Certification
   */
  public updateDoctorCertification(
    id: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}updateDoctorCertification/${id}`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor certification updated successfully'
          );
        })
      );
  }
  /**
   * Delete Doctor Certification
   */
  public deleteDoctorCertification(
    id: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}deleteDoctorCertification/${id}`
      )
      .pipe(
        map((res: any) => {
          if (!res?.success) {
            throw new Error(
              res?.message ||
              'Doctor certification delete failed'
            );
          }

          return res;
        }),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor certification deleted successfully'
          );
        })
      );
  }
  /**
   * Get All Doctor Certifications
   */
  public getAllDoctorCertification(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getAllDoctorCertification`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor certifications fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Certification By Id
   */
  public getDoctorCertificationById(
    id: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getDoctorCertificationById/${id}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor certification fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Certifications By Doctor Id
   */
  public getDoctorCertificationByDoctorId(
    doctorId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getDoctorCertificationByDoctor/${doctorId}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor certifications fetched successfully'
            );
          }
        })
      );
  }
  /* -------------------------------------------------------------------------- */
  /*                     Doctor Publication Methods                             */
  /* -------------------------------------------------------------------------- */
  /**
   * Add Doctor Publication
   */
  public addDoctorPublication(
    value: object
  ): Observable<any> {
    return this._coreApiService
      .post<any>(
        `${this.baseUrl}addPublication`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor publication added successfully'
          );
        })
      );
  }
  /**
   * Update Doctor Publication
   */
  public updateDoctorPublication(
    id: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}updatePublication/${id}`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor publication updated successfully'
          );
        })
      );
  }
  /**
   * Delete Doctor Publication
   */
  public deleteDoctorPublication(
    id: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}deletePublication/${id}`
      )
      .pipe(
        map((res: any) => {
          if (!res?.success) {
            throw new Error(
              res?.message ||
              'Doctor publication delete failed'
            );
          }

          return res;
        }),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor publication deleted successfully'
          );
        })
      );
  }
  /**
   * Get All Doctor Publications
   */
  public getAllDoctorPublication(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getAllPublication`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor publications fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Publication By Id
   */
  public getDoctorPublicationById(
    id: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getPublicationById/${id}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor publication fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Publications By Doctor Id
   */
  public getDoctorPublicationByDoctorId(
    doctorId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getPublicationByDoctor/${doctorId}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor publications fetched successfully'
            );
          }
        })
      );
  }
  /* -------------------------------------------------------------------------- */
  /*               Doctor Slot Configuration Methods                            */
  /* -------------------------------------------------------------------------- */
  /**
  * Add Doctor Slot
  */
  public addDoctorSlotConfiguration(
    value: object
  ): Observable<any> {
    return this._coreApiService
      .post<any>(
        `${this.baseUrl}addDoctorSlotConfiguration`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor slot added successfully'
          );
        })
      );
  }
  /**
  * Update Doctor Slot
  */
  public updateDoctorSlotConfiguration(
    id: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}updateDoctorSlotConfiguration/${id}`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor slot updated successfully'
          );
        })
      );
  }
  /**
  * Update Doctor Publication
  */
  public deleteDoctorSlotConfiguration(
    id: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}deleteDoctorSlotConfiguration/${id}`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor slots deleted successfully'
          );
        })
      );
  }
  /**
   * Get Doctor's Slots By Doctor Id
   */
  public getDoctorSlotConfigurationByDoctorId(
    doctorId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getDoctorSlotConfigurationByDoctor/${doctorId}`
      )
      .pipe(
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
  /* -------------------------------------------------------------------------- */
  /*                    Doctor Availability Methods                             */
  /* -------------------------------------------------------------------------- */
  /**
   * Add Doctor Availability
   */
  public addDoctorAvailability(
    value: object
  ): Observable<any> {
    return this._coreApiService
      .post<any>(
        `${this.baseUrl}addDoctorAvailability`,
        value,
        true
      )
      .pipe(
        map((res) => res),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor availability added successfully'
          );
        })
      );
  }
  /**
   * Update Doctor Availability
   */
  public updateDoctorAvailability(
    id: string,
    value: object
  ): Observable<any> {
    return this._coreApiService
      .put<any>(
        `${this.baseUrl}updateDoctorAvailability/${id}`,
        value,
        true
      )
      .pipe(
        map((res) => res.data),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor availability updated successfully'
          );
        })
      );
  }
  /**
   * Delete Doctor Availability
   */
  public deleteDoctorAvailability(
    id: string
  ): Observable<any> {
    return this._coreApiService
      .delete<any>(
        `${this.baseUrl}deleteDoctorAvailability/${id}`
      )
      .pipe(
        map((res: any) => {
          if (!res?.success) {
            throw new Error(
              res?.message ||
              'Doctor availability delete failed'
            );
          }

          return res.data;
        }),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor availability deleted successfully'
          );
        })
      );
  }
  /**
   * Get All Doctor Availability
   */
  public getAllDoctorAvailability(
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getAllDoctorAvailability`
      )
      .pipe(
        map((res) => res.data),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor availability list fetched successfully'
            );
          }
        })
      );
  }
  /**
   * Get Doctor Availability By Id
   */
  public getDoctorAvailabilityById(
    id: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getDoctorAvailabilityById/${id}`
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
   * Get Doctor Availability By Doctor Id
   */
  public getDoctorAvailabilityByDoctorId(
    doctorId: string,
    showNotification: boolean = false
  ): Observable<any> {
    return this._coreApiService
      .get<any>(
        `${this.baseUrl}getDoctorAvailabilityByDoctor/${doctorId}`
      )
      .pipe(
        map((res) => res),
        tap(() => {
          if (showNotification) {
            this._notificationServices.success(
              'Success',
              'Doctor availability list fetched successfully'
            );
          }
        })
      );
  }
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
   * Toggle Doctor Availability Status
   */
  public toggleDoctorAvailabilityStatus(
    id: string,
    isAvailable: boolean
  ): Observable<any> {
    return this._coreApiService
      .patch<any>(
        `${this.baseUrl}toggleDoctorAvailabilityStatus/${id}`,
        { isAvailable },
        true
      )
      .pipe(
        map((res) => res.data),
        tap(() => {
          this._notificationServices.success(
            'Success',
            'Doctor availability status updated successfully'
          );
        })
      );
  }
  /* -------------------------------------------------------------------------- */
  /*                    Doctor Chief Complaint                                  */
  /* -------------------------------------------------------------------------- */
  public getAllChiefComplaints(showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrlExt}getAllChiefComplaint`).pipe(map(res => res), tap(() => {
      if (showNotification) {
        this._notificationServices.success(
          'Success',
          'Chief Complaints fetched successfully'
        );
      }
    })
    );
  }
  public getChiefComplaintById(id: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrlExt}getChiefComplaintById/${id}`).pipe(map(res => res), tap(() => {
      if (showNotification) {
        this._notificationServices.success(
          'Success',
          'Chief Complaint details fetched successfully'
        );
      }
    })
    );
  }
  public getChiefComplaintsByPatientId(patientId: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrlExt}getChiefComplaintByPatientId/${patientId}`).pipe(map(res => res), tap(() => {
      if (showNotification) {
        this._notificationServices.success(
          'Success',
          'Patient Chief Complaints fetched successfully'
        );
      }
    })
    );
  }
  public createChiefComplaint(value: object): Observable<any> {
    return this._coreApiService.post<any>(`${this.baseUrlExt}createChiefComplaint`, value, true).pipe(map(res => res), tap(() => {
      this._notificationServices.success(
        'Success',
        'Chief Complaint created successfully'
      );
    })
    );
  }
  public updateChiefComplaint(id: string, value: object): Observable<any> {
    return this._coreApiService.put<any>(`${this.baseUrlExt}updateChiefComplaint/${id}`, value, true).pipe(map(res => res), tap(() => {
      this._notificationServices.success(
        'Success',
        'Chief Complaint updated successfully'
      );
    })
    );
  }
  public deleteChiefComplaint(id: string): Observable<any> {
    return this._coreApiService.delete<any>(`${this.baseUrlExt}deleteChiefComplaint/${id}`).pipe(map((res: any) => {
      if (!res?.success) {
        throw new Error(
          res?.message || 'Delete failed'
        );
      }
      return res.data;
    }), tap(() => {
      this._notificationServices.success(
        'Success',
        'Chief Complaint deleted successfully'
      );
    })
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                    Doctor Vital                                            */
  /* -------------------------------------------------------------------------- */
  public getAllVitals(showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrlVital}getAllVitals`).pipe(map(res => res), tap(() => {
      if (showNotification) {
        this._notificationServices.success(
          'Success',
          'Vitals fetched successfully'
        );
      }
    })
    );
  }
  public getVitalsById(id: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrlVital}getVitalsById/${id}`).pipe(map(res => res), tap(() => {
      if (showNotification) {
        this._notificationServices.success(
          'Success',
          'Vitals details fetched successfully'
        );
      }
    })
    );
  }
  public getVitalsByPatientId(patientId: string, showNotification: boolean = false): Observable<any> {
    return this._coreApiService.get<any>(`${this.baseUrlVital}getVitalsByPatientId/${patientId}`).pipe(map(res => res), tap(() => {
      if (showNotification) {
        this._notificationServices.success(
          'Success',
          'Patient Vitals fetched successfully'
        );
      }
    })
    );
  }
  public createVitals(value: object): Observable<any> {
    return this._coreApiService.post<any>(`${this.baseUrlVital}createVitals`, value, true).pipe(map(res => res), tap(() => {
      this._notificationServices.success(
        'Success',
        'Vital created successfully'
      );
    })
    );
  }
  public updateVitals(id: string, value: object): Observable<any> {
    return this._coreApiService.put<any>(`${this.baseUrlVital}updateVitals/${id}`, value, true).pipe(map(res => res), tap(() => {
      this._notificationServices.success(
        'Success',
        'Vital updated successfully'
      );
    })
    );
  }
  public deleteVitals(id: string): Observable<any> {
    return this._coreApiService.delete<any>(`${this.baseUrlVital}deleteVitals/${id}`).pipe(map((res: any) => {
      if (!res?.success) {
        throw new Error(
          res?.message || 'Delete failed'
        );
      }
      return res.data;
    }), tap(() => {
      this._notificationServices.success(
        'Success',
        'Vital deleted successfully'
      );
    })
    );
  }
}

