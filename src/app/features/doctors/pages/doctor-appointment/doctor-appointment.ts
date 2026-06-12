import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClinicList, IClinics, IDoctorById } from './../../../../core/interface/basic.interface';
import { Component, viewChild, ViewChild } from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotModule
} from '@daypilot/daypilot-lite-angular';
import { AppointmentBookService } from '../../../../core/services/appointment-book';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { ModalService } from '../../../../core/services/modal-service';
import { Sidebar } from '../../../../core/services/sidebar';
import { AppointmentBooking } from '../appointment-booking/appointment-booking';
import { StorageUserDetails, IAppointmentDetails, IAppointment, IDoctorByIdData } from '../../../../core/interface/basic.interface';
import { DoctorService } from '../../../../core/services/doctor';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { NotificationServices } from '../../../../core/services/notification-services';
import { Router } from '@angular/router';
import { Clinics } from '../../../../core/services/clinics';

@Component({
  selector: 'app-doctor-appointment',
  standalone: false,
  // imports: [DayPilotCalendarComponent],
  templateUrl: './doctor-appointment.html',
  styleUrls: ['./doctor-appointment.css'],
})
export class DoctorAppointment {
  @ViewChild('calendar') calendar!: DayPilotCalendarComponent;
  public clinicSelectionForm!: FormGroup;
  public clinicList: IClinicList[] = [];
  public pendingMovedEvent: any;

  public sidebar = viewChild<RightSidebar>('medicalSidebar');
  public currentView: 'Day' | 'Week' | 'Month' = 'Week';
  public currentDate = DayPilot.Date.today();
  public doctorProfile: IDoctorByIdData | null = null;
  public appointmentDetails: IAppointmentDetails | null = null;
  public appointmentStatuses = ['Pending', 'Checked-In', 'Completed', 'Cancelled', 'Confirmed', 'No Show'];
  public eventMenu = new DayPilot.Menu({
    items: [
      {
        text: 'Update Appointment',
        onClick: async (args) => {
          const event = args.source;
          this._appointmentBookService.getAppointmentsByAppointmentId(event.data.id).subscribe((res: any) => {
            if (res.success) {
              this.appointmentDetails = res.data;
              this.sidebar()?.openRightSidebar('', 'edit-appointment', this.appointmentDetails);
            }
          });
        }
      },
      {
        text: 'Mark as Checked-In',
        onClick: (args) => {
          const event = args.source;
          this._appointmentBookService.updateAppointmentStatus(event.data.id, 'Checked-In', false)
            .subscribe({
              next: (res) => {
                console.log('Status updated successfully:', res);
                this.getBookedAppointment();
              },
              error: (error) => {
                console.error('Failed to update appointment status:', error);
              }
            });
        }
      },
      {
        text: 'Mark as Completed',
        onClick: (args) => {
          console.log('Completed:', args.source.data.id);
          const event = args.source;
          this._appointmentBookService.updateAppointmentStatus(event.data.id, 'Completed', false)
            .subscribe({
              next: (res) => {
                console.log('Status updated successfully:', res);

                this.getBookedAppointment();
              },
              error: (error) => {
                console.error('Failed to update appointment status:', error);
              }
            });

        }
      },
      {
        text: 'Mark as Confirmed',
        onClick: (args) => {
          console.log('Confirmed:', args.source.data.id);
          const event = args.source;
          this._appointmentBookService.updateAppointmentStatus(event.data.id, 'Confirmed', false)
            .subscribe({
              next: (res) => {
                console.log('Status updated successfully:', res);

                this.getBookedAppointment();
              },
              error: (error) => {
                console.error('Failed to update appointment status:', error);
              }
            });
        }
      },
      {
        text: 'Cancel Appointment',
        onClick: (args) => {
          const event = args.source;
          this._notificationServices.confirm('', 'Are you sure you want to cancel this appointment?').then((result) => {
            if (result.isConfirmed) {
              this._appointmentBookService.updateAppointmentStatus(event.data.id, 'Cancelled', false).subscribe({
                next: (res) => {
                  console.log('Status updated successfully:', res);
                  this.getBookedAppointment();
                },
                error: (error) => {
                  console.error('Failed to update appointment status:', error);
                }
              });
            }
          });
        }
      },
      {
        text: 'Mark as No Show',
        onClick: (args) => {
          console.log('Confirmed:', args.source.data.id);
          const event = args.source;
          this._appointmentBookService.updateAppointmentStatus(event.data.id, 'No-Show', false)
            .subscribe({
              next: (res) => {
                this.getBookedAppointment();
              },
              error: (error) => {
                console.error('Failed to update appointment status:', error);
              }
            });
        }
      },
      {
        text: 'Write a Prescription',
        onClick: (args) => {
          console.log('Write a Prescription:', args.source.data.id);
          const event = args.source;
          this.router.navigate(['/layout/prescription/master/create', event.data.patientId, event.data.id, event.data.clinicId])
        }
      },
    ]
  });
  config: DayPilot.CalendarConfig = {
    viewType: 'Week',
    days: 1,
    startDate: DayPilot.Date.today(),
    businessBeginsHour: 9,
    businessEndsHour: 23,
    cellDuration: 30,
    timeRangeSelectedHandling: 'Enabled',
    eventMoveHandling: 'Update',
    eventResizeHandling: 'Update',
    contextMenu: this.eventMenu,
    onTimeRangeSelected: async (args) => {
      console.log(args)
      // const modal = await DayPilot.Modal.prompt('Patient Name', 'New Patient');
      // this.calendar.control.clearSelection();
      // if (!modal.result) {
      //   return;
      // }
      // this.calendar.control.events.add(
      //   new DayPilot.Event({
      //     id: DayPilot.guid(),
      //     text: modal.result,
      //     start: args.start,
      //     end: args.end
      //   })
      // );
    },
    onEventClick: async (args) => {
      this._appointmentBookService.getAppointmentsByAppointmentId(args.e.data.id).subscribe((res: any) => {
        if (res.success) {
          this.appointmentDetails = res.data;
          console.log(this.appointmentDetails);
          this.sidebar()?.openRightSidebar('', 'edit-appointment', this.appointmentDetails);
        }
      })
      // await DayPilot.Modal.alert(`Appointment: ${args.e.text()}`);
    },
    onEventMoved: (args) => {
      if (!args.e.data.clinicId) {
        // Store the moved event temporarily
        this.pendingMovedEvent = args;
        this._modalService.openModal('ClinicSelectionModal');
        return;
      }
      const payload = {
        ...args.e.data,
        appointmentDate: args.newStart.toString("yyyy-MM-dd"),
        startTime: args.newStart.toString("HH:mm"),
        endTime: args.newEnd.toString("HH:mm")
      };
      console.log(payload);
      this._appointmentBookService.updateAppointmentBooking(args.e.data.id, payload).subscribe(res => {
        if (res.success) {
          this.getBookedAppointment();
        }
      });
    },

    onEventResized: (args) => {
      if (!args.e.data.clinicId) {
        // Store the moved event temporarily
        this.pendingMovedEvent = args;
        this._modalService.openModal('ClinicSelectionModal');
        return;
      }
      const payload = {
        ...args.e.data,
        appointmentDate: args.newStart.toString("yyyy-MM-dd"),
        startTime: args.newStart.toString("HH:mm"),
        endTime: args.newEnd.toString("HH:mm")
      };
      this._appointmentBookService.updateAppointmentBooking(args.e.data.id, payload).subscribe(res => {
        if (res.success) {
          this.getBookedAppointment();
        }
      });
    },
  };

  monthConfig: DayPilot.MonthConfig = {
    startDate: DayPilot.Date.today(),
    locale: 'en-us',
    weekStarts: 1,

    eventMoveHandling: 'Update',
    eventResizeHandling: 'Update',
    timeRangeSelectedHandling: 'Enabled',
    contextMenu: this.eventMenu,
    onTimeRangeSelected: (args) => {
      console.log('Selected:', args.start.toString());
    },

    onEventClick: (args) => {
      console.log('Appointment:', args.e.data);
    },

    onEventMoved: (args) => {
      console.log('Moved:', args.e.data);
    },

    onEventResized: (args) => {
      console.log('Resized:', args.e.data);
    },

    onBeforeCellRender: (args) => {
      if (args.cell.start.toString() === DayPilot.Date.today().toString()) {
        args.cell.properties.cssClass = 'today-cell';
      }
    },

    onBeforeEventRender: (args) => {
      const status = args.data.tags?.appointmentStatus?.toLowerCase();

      // switch (status) {
      //   case 'pending':
      //     args.data.backColor = '#ffc107';
      //     args.data.fontColor = '#000';
      //     break;

      //   case 'completed':
      //     args.data.backColor = '#007bff';
      //     args.data.fontColor = '#fff';
      //     break;

      //   case 'cancelled':
      //     args.data.backColor = '#dc3545';
      //     args.data.fontColor = '#fff';
      //     break;

      //   case 'confirmed':
      //     args.data.backColor = '#28a745';
      //     args.data.fontColor = '#fff';
      //     break;
      // }
    }
  };
  //   monthConfig: DayPilot.MonthConfig = {
  //     startDate: DayPilot.Date.today(),

  //     // General Settings
  //     locale: 'en-us',
  //     weekStarts: 1, // Monday
  //     eventHeight: 24,
  //     cellHeight: 100,

  //     // Enable interactions
  //     eventMoveHandling: 'Update',
  //     eventResizeHandling: 'Update',
  //     timeRangeSelectedHandling: 'Enabled',

  //     // Display settings
  //     showWeekend: true,
  //     cellHeaderHeight: 25,

  //     // Highlight today
  //     onBeforeCellRender: (args) => {
  //       if (args.cell.start.toString() === DayPilot.Date.today().toString()) {
  //         args.cell.backColor = '#fff3cd';
  //         args.cell.borderColor = '#ffc107';
  //       }
  //     },

  //     // Event styling
  //     onBeforeEventRender: (args) => {
  //       args.data.borderRadius = '6px';
  //       args.data.fontColor = '#ffffff';
  //     },

  //     // Event click
  //     onEventClick: async (args) => {
  //       console.log('Appointment:', args.e.data);

  //       // Example:
  //       // this.openAppointmentDetails(args.e.data);
  //     },

  //     // Empty day click
  //     onTimeRangeSelected: async (args) => {
  //       console.log('Selected Date:', args.start.toString());

  //       // Example:
  //       // this.createAppointment(args.start);
  //     },

  //     // Event move
  //     onEventMoved: (args) => {
  //       console.log(
  //         `Appointment moved from ${args.oldStart} to ${args.newStart}`
  //       );

  //       // Call API to update appointment
  //     },

  //     // Event resize
  //     onEventResized: (args) => {
  //       console.log(
  //         `Appointment resized: ${args.newStart} - ${args.newEnd}`
  //       );

  //       // Call API to update appointment
  //     },

  //     // Tooltip
  //     onBeforeEventDomAdd: (args) => {
  //       const data = args.e.data;

  //       args.element.title = `
  // Appointment: ${data.text}
  // Status: ${data.tags?.appointmentStatus || ''}
  // Type: ${data.tags?.appointmentType || ''}
  // Mode: ${data.tags?.consultationMode || ''}
  //     `;
  //     }
  //   };

  public events: DayPilot.EventData[] = [];
  public userDetails!: StorageUserDetails;
  public doctorId: string | null = null;
  public bookedAppointments: IAppointmentDetails[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _appointmentBookService: AppointmentBookService,
    private _storageOperation: StorageOperation,
    private _doctorService: DoctorService,
    private _modalService: ModalService,
    private _sidebar: Sidebar,
    private _notificationServices: NotificationServices,
    private _clinicsService: Clinics,
  ) {
    this.initClinicForm();
  }

  ngOnInit(): void {
    this._sidebar.close$.subscribe((result) => {
      console.log('Right sidebar closed', result);
      this.getBookedAppointment();
    });

    const storedDoctorDetails = this._storageOperation.get<any>('userDetails');
    if (storedDoctorDetails) {
      this.doctorId = storedDoctorDetails.id || '';
    }
    const storedUserDetails = this._storageOperation.get<any>('user');
    if (storedUserDetails) {
      this.userDetails = storedDoctorDetails || '';
    }
  }

  ngAfterViewInit(): void {
    this.getClinicsByDoctorId();
    this.getDoctorProfile();
    this.getBookedAppointment();
  }

  get displayRange(): string {
    if (this.currentView === 'Week') {
      const start = this.currentDate.firstDayOfWeek();
      const end = start.addDays(6);
      return `${start.toString('dd MMM yyyy')} - ${end.toString('dd MMM yyyy')}`;
    }
    return this.currentDate.toString('dd MMM yyyy');
  }

  changeView(view: 'Day' | 'Week' | 'Month'): void {
    this.currentView = view;

    if (!this.calendar?.control) {
      return;
    }

    Promise.resolve().then(() => {
      switch (view) {

        case 'Day':
          this.calendar.control.update({
            viewType: 'Days',
            days: 1
          });
          break;

        case 'Week':
          this.calendar.control.update({
            viewType: 'Week'
          });
          break;

        case 'Month':
          this.calendar.control.update({
            viewType: 'Days',
            days: 30
          });
          break;
      }
    });
  }

  previousPeriod(): void {
    switch (this.currentView) {
      case 'Day':
        this.currentDate = this.currentDate.addDays(-1);
        break;
      case 'Week':
        this.currentDate = this.currentDate.addDays(-7);
        break;
      case 'Month':
        this.currentDate = this.currentDate.addMonths(-1);
        break;
    }

    this.updateCalendarDate();
  }

  nextPeriod(): void {
    switch (this.currentView) {
      case 'Day':
        this.currentDate = this.currentDate.addDays(1);
        break;
      case 'Week':
        this.currentDate = this.currentDate.addDays(7);
        break;
      case 'Month':
        this.currentDate = this.currentDate.addMonths(1);
        break;
    }

    this.updateCalendarDate();
  }

  goToToday(): void {
    this.currentDate = DayPilot.Date.today();
    this.updateCalendarDate();
  }

  updateCalendarDate(): void {
    if (this.currentView === 'Month') {
      this.monthConfig = {
        ...this.monthConfig,
        startDate: this.currentDate
      };
      return;
    }
    Promise.resolve().then(() => {
      this.calendar?.control.update({
        startDate: this.currentDate
      });
    });
  }

  getDoctorProfile(): void {
    if (this.doctorId) {
      this._doctorService.getDoctorsById(this.doctorId).subscribe((res: IDoctorById) => {
        if (res.success) {
          this.doctorProfile = res.data;
        }
      });
    }
  }

  private getClinicsByDoctorId(): void {
    this._clinicsService.getAllClinics().subscribe((res: IClinics) => {
      this.clinicList = res.data;
    });
  }

  getBookedAppointment(): void {
    if (this.doctorId) {
      this._appointmentBookService.getAppointmentBookingByDoctorId(this.doctorId).subscribe((res: IAppointment) => {
        if (res.success && res.data.length > 0) {
          this.bookedAppointments = res.data.sort((a: any, b: any) => {
            const numA = Number(a.appointmentNumber.replace('APT-', ''));
            const numB = Number(b.appointmentNumber.replace('APT-', ''));
            return numA - numB; // Ascending
          });
          this.loadAppointments(res.data);
        }
      });
    }
  }

  loadAppointments(appointments: any[]): void {
    // console.log(appointments);
    const events = appointments.map((appointment) => {

      let backColor = '#6c757d';
      let borderColor = '#6c757d';
      let fontColor = '#ffffff';

      switch (appointment.appointmentStatus?.toLowerCase()) {

        case 'pending':
          backColor = '#ffc107';     // Yellow
          borderColor = '#e0a800';
          fontColor = '#000000';
          break;

        case 'checked-in':
          backColor = '#28a745';     // Green
          borderColor = '#1e7e34';
          break;

        case 'completed':
          backColor = '#007bff';     // Blue
          borderColor = '#0056b3';
          break;

        case 'cancelled':
          backColor = '#dc3545';     // Red
          borderColor = '#bd2130';
          break;

        case 'confirmed':
          backColor = '#17a2b8';     // Cyan
          borderColor = '#117a8b';
          break;

        case 'no-show':
          backColor = '#343a40';     // Dark Gray
          borderColor = '#1d2124';
          break;
      }
      return {
        id: appointment._id,
        doctorId: appointment?.doctorId?._id ? appointment?.doctorId?._id : '',
        patientId: appointment?.patientId?._id ? appointment?.patientId?._id : '',
        clinicId: appointment?.clinicId?._id ? appointment?.clinicId?._id : '',
        text: `${appointment.appointmentNumber} - ${appointment.consultationMode} / (${appointment.appointmentStatus})`,
        start: `${appointment.appointmentDate.split('T')[0]}T${appointment.startTime}:00`,
        end: `${appointment.appointmentDate.split('T')[0]}T${appointment.endTime}:00`,
        backColor,
        borderColor,
        fontColor,
        tags: {
          appointmentNumber: appointment.appointmentNumber,
          appointmentType: appointment.appointmentType,
          consultationMode: appointment.consultationMode,
          appointmentStatus: appointment.appointmentStatus,
          bookingSource: appointment.bookingSource,
          symptoms: appointment.symptoms,
          notes: appointment.notes,
          consultationFee: appointment.consultationFee,
          paymentStatus: appointment.paymentStatus,
          cancelledReason: appointment.cancelledReason
        }
      };
    });
    this.events = events;
  }

  bookAppointment(): void {
    // const modalRef = this._modalService.openComponentModal(AppointmentBooking, {
    //   class: 'modal-dialog-centered modal-lg',
    //   initialState: {
    //     doctorDetails: this.doctorProfile
    //   }
    // });
    const modalRef = this._modalService.openComponentModal(AppointmentBooking,
      {
        class: 'modal-dialog-centered modal-lg',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          doctorDetails: this.doctorProfile,
          isModel: true,
        }
      });

    modalRef.content.appointmentSaved.subscribe((data: any) => {
      this.getBookedAppointment();
    });
  }

  getAppointmentStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'appt-pending';
      case 'checked-in':
        return 'appt-checkedin';
      case 'completed':
        return 'appt-completed';
      case 'cancelled':
        return 'appt-cancelled';
      case 'confirmed':
        return 'appt-confirmed';
      case 'no-show':
        return 'appt-noshow';
      default:
        return 'appt-default';
    }
  }

  private initClinicForm(): void {
    this.clinicSelectionForm = this.fb.group({
      clinicId: [null, Validators.required],
    });
  }

  public ChangeClinic(): void {
    const args = this.pendingMovedEvent;
    const payload = {
      ...args.e.data,
      clinicId: this.clinicSelectionForm.value.clinicId,
      appointmentDate: args.newStart.toString("yyyy-MM-dd"),
      startTime: args.newStart.toString("HH:mm"),
      endTime: args.newEnd.toString("HH:mm")
    };
    this._appointmentBookService.updateAppointmentBooking(args.e.data.id, payload).subscribe(res => {
      if (res.success) {
        this.clinicSelectionForm.reset();
        this.pendingMovedEvent = null;
        this.getBookedAppointment();
        this._modalService.closeModal('ClinicSelectionModal');
      }
    });
  }

  // loadDummyAppointments(): void {
  //   const today = DayPilot.Date.today();
  //   this.events = [
  //     {
  //       id: 1,
  //       text: 'John Smith',
  //       start: today.addHours(9),
  //       end: today.addHours(9.5)
  //     },
  //     {
  //       id: 2,
  //       text: 'Emma Wilson',
  //       start: today.addHours(10),
  //       end: today.addHours(11)
  //     },
  //     {
  //       id: 3,
  //       text: 'Michael Johnson',
  //       start: today.addHours(11.5),
  //       end: today.addHours(12)
  //     },
  //     {
  //       id: 4,
  //       text: 'Sophia Brown',
  //       start: today.addHours(14),
  //       end: today.addHours(15)
  //     },
  //     {
  //       id: 5,
  //       text: 'David Miller',
  //       start: today.addHours(16),
  //       end: today.addHours(16.5)
  //     }
  //   ];
  //   console.log(this.events);
  // }

}
