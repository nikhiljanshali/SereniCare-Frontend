import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAvailableSlots } from '../../../../core/interface/basic.interface';
import { PatientService } from '../../../../core/services/patients';
import { CommonMethod } from '../../../../core/services/common-method';
import { AppointmentBookService } from '../../../../core/services/appointment-book';
import { ModalService } from '../../../../core/services/modal-service';
import { StorageOperation } from '../../../../core/services/storage-operation';

@Component({
  selector: 'app-edit-appointment-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-appointment-booking.html',
  styleUrl: './edit-appointment-booking.css',
})
export class EditAppointmentBooking {
  // @Input() appointmentDetails!: IAppointmentDetails;
  @Input() appointmentDetails!: any;
  @Output() saveSuccess = new EventEmitter<boolean>();
  public appointmentBookingForm!: FormGroup;
  public minDate: string = new Date().toISOString().split('T')[0];
  public availableStartSlots: IAvailableSlots = [];
  public availableEndSlots: IAvailableSlots = [];
  public bookingSourceOptions: string[] = [];
  public userRole: string = '';
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

  constructor(
    private fb: FormBuilder,
    public _modalService: ModalService,
    private _patientService: PatientService,
    private _appointmentBookService: AppointmentBookService,
    private _storageOperation: StorageOperation,
    private _commonMethod: CommonMethod
  ) {
    const storedDoctorDetails = this._storageOperation.get<any>('user');
    if (storedDoctorDetails) {
      this.userRole = storedDoctorDetails.role || '';
    }
  }

  ngOnInit(): void {
    this.initAppointmentBookingForm();
    this.setBookingSourceOptions();
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

  private initAppointmentBookingForm(): void {
    this.appointmentBookingForm = this.fb.group({
      appointmentNumber: [this.appointmentDetails?.appointmentNumber],
      doctorId: [
        { value: this.appointmentDetails?.doctorId._id, disabled: true },
        Validators.required
      ],

      patientId: [
        { value: this.appointmentDetails?.patientId._id, disabled: true },
        Validators.required
      ],

      patientName: [
        {
          value: `${this.appointmentDetails?.patientId.firstName} ${this.appointmentDetails?.patientId.lastName}`,
          disabled: true
        }
      ],

      clinicId: [
        { value: this.appointmentDetails?.clinicId?._id, disabled: true },
        Validators.required
      ],

      clinicName: [
        {
          value: `${this.appointmentDetails?.clinicId?.clinicName}`,
          disabled: true
        }
      ],

      appointmentDate: [
        {
          value: this._commonMethod.formatDateForInput(this.appointmentDetails?.appointmentDate),
          disabled: true
        },
        Validators.required
      ],

      dayOfWeek: [
        { value: this.appointmentDetails?.dayOfWeek, disabled: true },
        Validators.required
      ],

      startTime: [
        { value: this.appointmentDetails?.startTime, disabled: true },
        Validators.required
      ],

      endTime: [
        { value: this.appointmentDetails?.endTime, disabled: true },
        Validators.required
      ],
      appointmentType: [this.appointmentDetails?.appointmentType, Validators.required],
      consultationMode: [this.appointmentDetails?.consultationMode, Validators.required],
      appointmentStatus: [this.appointmentDetails?.appointmentStatus, Validators.required],
      bookingSource: [this.appointmentDetails?.bookingSource, Validators.required],
      symptoms: [this.appointmentDetails?.symptoms],
      notes: [this.appointmentDetails?.notes],
      consultationFee: [0, [Validators.min(0)]],
      paymentStatus: ['Pending', Validators.required],
      cancelledReason: [''],
      cancelledBy: ['']
    });
  }

  updateBookAppointment(): void {
    this._appointmentBookService.updateAppointmentBooking(this.appointmentDetails._id, this.appointmentBookingForm.value).subscribe((res) => {
      console.log(res.success);
      if (res.success) {
        this.saveSuccess.emit(true);
      }
    })
  }
}
