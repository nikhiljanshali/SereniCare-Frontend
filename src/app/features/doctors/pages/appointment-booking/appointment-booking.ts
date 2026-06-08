import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../../core/services/patients';
import { ModalService } from '../../../../core/services/modal-service';
import { AppointmentBookService } from '../../../../core/services/appointment-book';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { IPatientsData, IDoctorByIdData, Slot, IAvailableSlots, IDoctorSlotsByDay, DoctorId, IClinicList, IClinics } from '../../../../core/interface/basic.interface';
import { Clinics } from '../../../../core/services/clinics';

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
  public userRole: string = '';
  public bookingSourceOptions: string[] = [];
  public clinicList: IClinicList[] = [];
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
  public doctorId: string = '';
  constructor(
    private fb: FormBuilder,
    public _modalService: ModalService,
    private _patientService: PatientService,
    private _appointmentBookService: AppointmentBookService,
    private _storageOperation: StorageOperation,
    private _clinicsService: Clinics,
  ) {
    const storedUser = this._storageOperation.get<any>('user');
    if (storedUser) {
      this.userRole = storedUser.role || '';
    }
    const storedUserDetails = this._storageOperation.get<any>('userDetails');
    if (storedUserDetails) {
      this.doctorId = storedUserDetails.id || '';
    }
  }

  ngOnInit(): void {
    this.setBookingSourceOptions();
    this.initAppointmentBookingForm();
    this.getClinicsByDoctorId();
    this.getPatients();
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

  private getClinicsByDoctorId(): void {
    this._clinicsService.getAllClinics().subscribe((res: IClinics) => {
      this.clinicList = res.data;
    });
  }

  private getPatients(): void {
    this._patientService.getPatients().subscribe((res) => {
      this.patients = res.data || [];
    });
  }

  private initAppointmentBookingForm(): void {
    this.appointmentBookingForm = this.fb.group({
      appointmentNumber: [''],
      doctorId: [this.isModel ? this.doctorDetails?._id : this.doctorId, Validators.required],
      patientId: ['', Validators.required],
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
    this.appointmentBookingForm.get('appointmentDate')?.valueChanges.subscribe((date) => {
      if (date) {
        const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        this.appointmentBookingForm.patchValue({ dayOfWeek: dayName, }, { emitEvent: false });
        this._appointmentBookService.getDoctorSlotsByDay(this.doctorDetails?._id || '', dayName, false).subscribe({
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
        // this._appointmentBookService.getDoctorSlotsByDay(this.doctorDetails?._id || '', dayName, true).subscribe((res) => {
        //   const availability = res.data;
        //   console.log('Doctor Availability:', availability);
        //   // if (availability && availability.length > 0) {
        //   //   const shifts = availability[0].shifts;
        //   //   if (shifts && shifts.length > 0) {
        //   //     const firstShift = shifts[0];
        //   //     this.appointmentBookingForm.patchValue({
        //   //       startTime: firstShift.startTime,
        //   //       endTime: firstShift.endTime
        //   //     }, { emitEvent: false });
        //   //   } else {
        //   //     this.appointmentBookingForm.patchValue({
        //   //       startTime: '',
        //   //       endTime: ''
        //   //     }, { emitEvent: false });
        //   //   }
        //   // } else {
        //   //   this.appointmentBookingForm.patchValue({
        //   //     startTime: '',
        //   //     endTime: ''
        //   //   }, { emitEvent: false });
        //   //   this._modalService.openComponentModal(AppointmentBooking, { data: { message: 'Doctor is not available on the selected date. Please choose another date.' } });
        //   // }
        // }, (error) => {
        //   console.error('Error fetching doctor availability:', error);
        //   this.appointmentBookingForm.patchValue({
        //     startTime: '',
        //     endTime: ''
        //   }, { emitEvent: false });
        //   this._modalService.openComponentModal(AppointmentBooking, { data: { message: 'Error fetching doctor availability. Please try again later.' } });
        // });
      } else {
        this.appointmentBookingForm.patchValue({
          dayOfWeek: '',
          startTime: '',
          endTime: ''
        }, { emitEvent: false });
      }
    });
  }

  public bookAppointment(): void {
    this._appointmentBookService.addAppointmentBooking(this.appointmentBookingForm.value).subscribe({
      next: (res) => {
        debugger;
        this.appointmentSaved.emit(true);
        this._modalService.closeComponentModal();
      },
      error: (err) => {
        console.error('Error booking appointment:', err);
        // Optionally, show an error message to the user
      }
    });
    return;
    // if (this.appointmentBookingForm.valid) {
    //   // Logic to book the appointment
    //   console.log('Booking appointment with data:', this.appointmentBookingForm.value);
    // }
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }

}
