import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Roles } from '../../../../core/enum/common.enum';
import { IPatientsData, IDoctorByIdData, Slot, IAvailableSlots, IClinicList, IDoctorsData, IDoctorSlotsByDay } from '../../../../core/interface/basic.interface';
import { AppointmentBookService } from '../../../../core/services/appointment-book';
import { Clinics } from '../../../../core/services/clinics';
import { DoctorService } from '../../../../core/services/doctor';
import { ModalService } from '../../../../core/services/modal-service';
import { PatientService } from '../../../../core/services/patients';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { forkJoin, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-booking.html',
  styleUrl: './appointment-booking.css',
})
export class AppointmentBooking {
  public appointmentSaved = new EventEmitter<any>()
  public appointmentBookingForm!: FormGroup;
  public patients: IPatientsData[] = [];
  public doctorDetails: IDoctorByIdData | null = null;
  public isModel: boolean = false;
  public data: any;
  public minDate: string = new Date().toISOString().split('T')[0];
  public doctorSlots: Slot[] = [];
  public availableStartSlots: IAvailableSlots = [];
  public availableEndSlots: IAvailableSlots = [];
  public breakMessage: string = '';

  public bookingSourceOptions: string[] = [];
  public clinicList: IClinicList[] = [];
  public doctorsList: IDoctorsData[] = [];
  public appointmentStatusOptions: string[] = [
    'Pending',
    'Confirmed',
    'Checked-In',
    'Completed',
    'Cancelled',
    'No-Show'
  ];
  public consultationModes: string[] = [
    'New Patient',
    'Follow-Up',
    'Emergency'
  ];
  public AppointmentTypes: string[] = [
    'In-Person',
    'Telemedicine',
  ];
  // List of common quick-select symptoms
  public commonSymptoms: string[] = [
    // Constitutional / General
    'Fever',
    'Chills',
    'Fatigue',
    'Weakness',
    'Weight Loss',
    'Night Sweats',

    // Respiratory & ENT
    'Cough',
    'Shortness of Breath',
    'Sore Throat',
    'Runny Nose',
    'Nasal Congestion',
    'Loss of Taste / Smell',
    'Sneezing',
    'Ear Pain',

    // Pain & Musculoskeletal
    'Headache',
    'Body Ache',
    'Joint Pain',
    'Back Pain',
    'Chest Pain',
    'Muscle Cramps',

    // Gastrointestinal
    'Nausea',
    'Vomiting',
    'Diarrhea',
    'Abdominal Pain',
    'Loss of Appetite',
    'Acidity / Heartburn',
    'Bloating',
    'Constipation',

    // Neurological & Mental
    'Dizziness',
    'Lightheadedness',
    'Confusion',
    'Insomnia',

    // Dermatological / Skin
    'Skin Rash',
    'Itching',
    'Swelling'
  ];
  public userRole: string = '';
  public doctorId: string = '';
  public patientId: string = '';
  public systemId: string = '';
  constructor(
    private fb: FormBuilder,
    public _modalService: ModalService,
    private _patientService: PatientService,
    private _appointmentBookService: AppointmentBookService,
    private _storageOperation: StorageOperation,
    private _clinicsService: Clinics,
    private _doctorService: DoctorService,
  ) {

  }

  ngOnInit(): void {
    this.setUserDetails();
    this.setBookingSourceOptions();
    this.initAppointmentBookingForm();
    this.loadAppointmentData();
  }

  private setUserDetails(): void {
    const storedUser = this._storageOperation.get<any>('user');
    const storedUserDetails = this._storageOperation.get<any>('userDetails');
    this.userRole = storedUser?.role || '';
    if (storedUser) {
      const userId = storedUserDetails.id || '';
      switch (this.userRole) {
        case 'Patient':
          this.patientId = userId;
          break;
        case 'Doctor':
          this.doctorId = userId;
          break;
        case 'System Admin':
          this.systemId = storedUser.id;
          break;
        default:
          break;
      }
    }
  }

  private loadAppointmentData(): void {
    forkJoin({
      doctors: this.getDoctors(),
      patients: this.getPatients()
    }).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Error loading doctors/patients:', error);
      }
    });
  }


  private getDoctors(): Observable<any> {
    return this._doctorService.getAllDoctors().pipe(
      tap((res: any) => {
        this.doctorsList = res.data || [];
      })
    );
  }

  private getPatients(): Observable<any> {
    return this._patientService.getPatients().pipe(
      tap((res: any) => {
        this.patients = res.data || [];
      })
    );
  }

  private getClinicsByDoctorId(doctorid: string): void {
    this.clinicList = [];
    this._clinicsService.getClinicByDoctorId(doctorid).subscribe((res: any) => {
      this.clinicList = res.data;
    });
  }

  private initAppointmentBookingForm(): void {
    this.appointmentBookingForm = this.fb.group({
      appointmentNumber: [''],
      doctorId: [this.userRole === 'Doctor' ? this.doctorId || null : null, Validators.required],
      patientId: [this.userRole === 'Patient' ? this.patientId : null, Validators.required],
      clinicId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      dayOfWeek: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      appointmentType: [null, Validators.required],
      consultationMode: [null, Validators.required],
      appointmentStatus: [null, Validators.required],
      bookingSource: [null, Validators.required],
      symptoms: [''],
      notes: [''],
      consultationFee: [0, [Validators.min(0)]],
      paymentStatus: ['Pending', Validators.required],
      cancelledReason: [''],
      cancelledBy: ['']
    });
    this.appointmentBookingForm.get('appointmentDate')?.valueChanges.subscribe((data) => {
      if (data) {
        const dayName = new Date(data).toLocaleDateString('en-US', { weekday: 'long' });
        this.appointmentBookingForm.patchValue({ dayOfWeek: dayName, }, { emitEvent: false });
        this._appointmentBookService.getDoctorSlotsByDay(this.doctorDetails?._id || this.doctorId || this.appointmentBookingForm.get('doctorId')?.value, dayName, false).subscribe({
          next: (res: IDoctorSlotsByDay) => {
            this.doctorSlots = res.data.slots || [];
            this.availableStartSlots = this.doctorSlots.map(slot => slot.startTime);
            this.availableEndSlots = this.doctorSlots.map(slot => slot.endTime);
            const breakShifts = res.data.breakShifts || [];
            this.breakMessage = breakShifts.map((shift: any) =>
              `Doctor is unavailable from ${shift.startTime} to ${shift.endTime} due to a scheduled break.`
            ).join(' ');
          }, error: (error) => {
            console.error('Error fetching doctor availability:', error);
            this.appointmentBookingForm.patchValue({ startTime: '', endTime: '', }, { emitEvent: false });
          },
          complete: () => {
            console.log('Availability fetch completed');
          },
        });
      } else {
        this.appointmentBookingForm.patchValue({
          dayOfWeek: '',
          startTime: '',
          endTime: ''
        }, { emitEvent: false });
      }
    });
  }

  public onDoctorChange(event: Event): void {
    // Use trim() or String conversion to prevent type mismatches
    const doctorId = String(this.appointmentBookingForm.get('doctorId')?.value || '').trim();
    // Use find() instead of filter() to get the single doctor object
    const selectedDoctor = this.doctorsList.find(
      doctor => String(doctor._id).trim() === doctorId
    );
    if (selectedDoctor) {
      // Access properties directly
      this.getClinicsByDoctorId(selectedDoctor._id);
    } else {
      console.warn('No doctor found matching ID:', doctorId);
    }
  }

  /**
   * Appends the clicked tag to the symptoms textarea.
   * Prevents duplicates and joins items with comma separation.
   */
  public addSymptomTag(symptom: string): void {
    const control = this.appointmentBookingForm.get('symptoms');
    if (!control) return;

    const currentValue: string = control.value || '';

    // Split existing values into an array, trimmed and cleaned
    const existingList = currentValue
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    // If tag is not already present, append it
    if (!existingList.includes(symptom)) {
      existingList.push(symptom);
      control.setValue(existingList.join(', '));
      control.markAsTouched();
      control.markAsDirty();
    }
  }

  private setBookingSourceOptions(): void {
    switch (this.userRole) {
      case 'Doctor':
        this.bookingSourceOptions = ['Doctor'];
        break;

      case 'Patient':
        this.bookingSourceOptions = ['Patient Portal'];
        break;

      case 'System Admin':
        this.bookingSourceOptions = [
          'Admin'
        ];
        break;

      default:
        this.bookingSourceOptions = [];
    }
  }

  public bookAppointment(): void {
    // 1. Check if the form is valid before proceeding
    if (this.appointmentBookingForm.invalid) {
      // Mark all form fields as touched so validation error UI messages appear
      this.appointmentBookingForm.markAllAsTouched();
      console.warn('Form is invalid. Please fill in all required fields.');
      return;
    }

    // 2. Form is valid, make the API call
    this._appointmentBookService.addAppointmentBooking(this.appointmentBookingForm.value).subscribe({
      next: (res) => {
        this.appointmentSaved.emit(true);
        this._modalService.closeComponentModal();
      },
      error: (err) => {
        console.error('Error booking appointment:', err);
        // Optionally handle error notification here
      }
    });
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }

}
