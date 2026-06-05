import { Component, OnDestroy, viewChild } from '@angular/core';
import { DoctorService } from '../../../../core/services/doctor';
import { LocationService } from '../../../../core/services/location-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RightSidebar } from '../../../../shared/component/right-sidebar/right-sidebar';
import { ModalService } from '../../../../core/services/modal-service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimarySpecialityService } from '../../../../core/services/primary-speciality';
import { NotificationServices } from '../../../../core/services/notification-services';
import { CommonMethod } from '../../../../core/services/common-method';
import { AppointmentBooking } from '../appointment-booking/appointment-booking';
import { AppointmentBookService } from '../../../../core/services/appointment-book';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { IDoctorByIdData, IDoctorLeaveDetails, IDoctorQualificationDetails, IDoctorWorkExperienceDetails, IDoctorCertifcicaionDetails, IDoctorPublicaionDetails, IDoctorAvailabilityDetails, IAppointmentDetails, IDoctorById, DoctorSlotConfiguration, IDoctorAvailability, IAppointment, IPrimarySpecialityData, IPrimarySpeciality, IDoctorQualification, IDoctorWorkExperience, IDoctorLeaveResponse, IDoctorCertifcicaion, IDoctorPublicaion } from '../../../../core/interface/basic.interface';

@Component({
  selector: 'app-doctor-profile',
  standalone: false,
  // imports: [],
  templateUrl: './doctor-profile.html',
  styleUrl: './doctor-profile.css',
})
export class DoctorProfile implements OnDestroy {

  public sidebar = viewChild<RightSidebar>('medicalSidebar');
  private doctorId: string | null = null;

  public doctorProfile: IDoctorByIdData | null = null;
  public doctorLeaves: IDoctorLeaveDetails[] = [];
  public doctorEducations: IDoctorQualificationDetails[] = [];
  public doctorWorkExperiences: IDoctorWorkExperienceDetails[] = [];
  public doctorCertificaion: IDoctorCertifcicaionDetails[] = [];
  public doctorPublicaion: IDoctorPublicaionDetails[] = [];
  public doctorAvailability: IDoctorAvailabilityDetails[] = [];
  public bookedAppointments: IAppointmentDetails[] = [];
  public paginatedAppointments: any[] = [];

  public currentPage = 1;
  public pageSize = 10;
  public totalPages = 0;
  public pages: number[] = [];

  public isMoreMenuOpen = false;
  public qualificationText: string = '';
  public activeTab: string = 'overview';

  public doctorLeaveForm!: FormGroup;
  public doctorEducaionForm!: FormGroup;
  public doctorWorkExperienceForm!: FormGroup;
  public doctorCertificationForm!: FormGroup;
  public doctorPublicationForm!: FormGroup;
  public doctorSlotConfigurationForm!: FormGroup;
  public doctorAvailabilityForm!: FormGroup;

  public tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'bi-bar-chart-line'
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: 'bi-calendar3'
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: 'bi-clock-history'
    },
    {
      id: 'credentials',
      label: 'Credentials',
      icon: 'bi-mortarboard'
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: 'bi-chat-quote'
    }
  ];
  public userRole: string = '';

  private readonly dayOrder: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public Math = Math;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _doctorService: DoctorService,
    public _locationService: LocationService,
    public _modalService: ModalService,
    private _primarySpecialityService: PrimarySpecialityService,
    private _notificationServices: NotificationServices,
    private _CommonMethod: CommonMethod,
    private _appointmentBookService: AppointmentBookService,
    private _storageOperation: StorageOperation
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.doctorId = id;
    });
    const storedDoctorDetails = this._storageOperation.get<any>('user');
    if (storedDoctorDetails) {
      this.userRole = storedDoctorDetails.role || '';
    }
  }
  ngOnDestroy(): void {
    this.sidebar()?.closeRightSidebar();
  }

  ngOnInit(): void {
    this.initDoctorLeaveForm();
    this.initiDoctorEducationForm();
    this.initDoctorWorkExperienceForm();
    this.initDoctorCertificationForm();
    this.initDoctorPublicationForm();
    this.initDoctorSlotConfigurationForm();
    this.initDoctorAvailabilityForm();

    this.getAllPrimarySpecialities();
    this.getDoctorProfile();
    this.getDoctorLeaves();
    this.getDoctorEducaions();
    this.getDoctorWorkExperience();
    this.getDoctorCertificaion();
    this.getDoctorPublicaion();
    this.getDoctorSlotConfiguration();
    this.getDoctorAvailability();
    this.getBookedAppointment();
  }

  private initDoctorLeaveForm(): void {
    this.doctorLeaveForm = this.fb.group({
      doctorId: [
        this.doctorId,
        [Validators.required]
      ],

      leaveType: [
        { value: '', disabled: false },
        [Validators.required]
      ],

      leaveStartDate: [
        '',
        [Validators.required]
      ],

      leaveEndDate: [
        '',
        [Validators.required]
      ],

      leaveReason: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ]
      ],
    });
  }

  private initiDoctorEducationForm(): void {
    this.doctorEducaionForm = this.fb.group({
      doctorId: [
        this.doctorId,
        [Validators.required]
      ],

      degreeName: [
        { value: '', disabled: false },
        [Validators.required]
      ],

      specializations: [
        '',
        []
      ],

      instituteName: [
        '',
        []
      ],

      universityName: [
        '',
        []
      ],

      startYear: [
        '',
        [Validators.required]
      ],

      endYear: [
        '',
        [Validators.required]
      ],

      grade: [
        '',
        [Validators.required]
      ],

      achievement: [
        '',
        []
      ],

      description: [
        '',
        []
      ],

      educationType: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ]
      ],
    });

  }

  private initDoctorWorkExperienceForm(): void {
    this.doctorWorkExperienceForm = this.fb.group({
      doctorId: [
        this.doctorId,
        [Validators.required]
      ],

      hospitalName: [
        '',
        [Validators.required]
      ],

      designation: [
        '',
        [Validators.required]
      ],

      employmentType: [
        'Full Time'
      ],

      department: [
        ''
      ],

      startDate: [
        '',
        [Validators.required]
      ],

      endDate: [
        ''
      ],

      currentlyWorking: [
        false
      ],

      location: [
        ''
      ],

      description: [
        ''
      ],

      achievements: [
        ''
      ],

      displayOrder: [
        0
      ],
    });
  }

  private initDoctorCertificationForm(): void {
    this.doctorCertificationForm = this.fb.group({
      doctorId: [
        this.doctorId,
        [Validators.required]
      ],
      certificateName: ['', Validators.required],
      issuingBody: ['', Validators.required],
      certificateNumber: [''],
      issuedDate: ['', Validators.required],
      expiryDate: [''],
      isLifetime: [false],
      status: ['Valid'],
      documentUrl: [''],
      remarks: ['']
    });
  }

  private initDoctorPublicationForm(): void {
    this.doctorPublicationForm =
      this.fb.group({
        doctorId: [
          this.doctorId,
          [Validators.required]
        ],
        title: ['', Validators.required],
        journalName: ['', Validators.required],
        publicationYear: [
          '',
          Validators.required
        ],
        authorRole: [
          '',
          Validators.required
        ],
        doi: [''],
        publicationUrl: [''],
        abstract: ['']
      });
  }

  private initDoctorSlotConfigurationForm() {
    this.doctorSlotConfigurationForm =
      this.fb.group({
        doctorId: [
          this.doctorId,
          [Validators.required]
        ],
        defaultSlotDuration: [
          30,
          Validators.required
        ],

        maxDailyAppointments: [
          '',
          Validators.required
        ],

        emergencyBufferSlots: [
          0,
          Validators.required
        ],

        telemedicineEnabled: [true],

        telemedicineSlotsPerDay: [
          0,
          Validators.required
        ],
      });
  }

  private initDoctorAvailabilityForm(): void {
    this.doctorAvailabilityForm = this.fb.group({
      doctorId: [this.doctorId, Validators.required],
      dayOfWeek: [null, Validators.required],
      isAvailable: [true],
      appointmentTypes: [[], Validators.required],
      shifts: this.fb.array([
        this.createShiftFormGroup()
      ])
    });
  }

  private createShiftFormGroup(): FormGroup {
    console.log('Test');
    return this.fb.group({
      isBreakTime: [false],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  get shifts(): FormArray {
    return this.doctorAvailabilityForm.get(
      'shifts'
    ) as FormArray;
  }

  public selectTab(tabId: string): void {
    this.activeTab = tabId;
  }

  getDoctorProfile(): void {
    if (this.doctorId) {
      this._doctorService.getDoctorsById(this.doctorId).subscribe((res: IDoctorById) => {
        if (res.success) {
          res.data.joined = this._CommonMethod.getExperience(res.data.dateOfJoin);
          this.doctorProfile = res.data;
          this.qualificationText = this.doctorProfile.qualifications?.map((item: any) => item.name).join(' · ');
        }
      });
    }
  }


  getDoctorLeaves(): void {
    if (this.doctorId) {
      this._doctorService.getDoctorLeavesByDoctorId(this.doctorId).subscribe((res: { data: IDoctorLeaveDetails[] }) => {
        if (res.data) {
          this.doctorLeaves = res.data;
        }
      });
    }
  }

  getDoctorEducaions(): void {
    if (this.doctorId) {
      this._doctorService.getDoctorEducationByDoctorId(this.doctorId).subscribe((res: { data: IDoctorQualificationDetails[] }) => {
        if (res.data) {
          this.doctorEducations = res.data;
        }
      });
    }
  }

  getDoctorWorkExperience(): void {
    if (this.doctorId) {
      this._doctorService.getDoctorWorkExperienceByDoctorId(this.doctorId).subscribe((res: { data: IDoctorWorkExperienceDetails[] }) => {
        if (res.data) {
          this.doctorWorkExperiences = res.data;
        }
      });
    }
  }

  getDoctorCertificaion(): void {
    if (this.doctorId) {
      this._doctorService.getDoctorCertificationByDoctorId(this.doctorId).subscribe((res: { data: IDoctorCertifcicaionDetails[] }) => {
        if (res.data) {
          this.doctorCertificaion = res.data;
        }
      });
    }
  }

  getDoctorPublicaion(): void {
    if (this.doctorId) {
      this._doctorService.getDoctorPublicationByDoctorId(this.doctorId).subscribe((res: { data: IDoctorPublicaionDetails[] }) => {
        if (res.data) {
          this.doctorPublicaion = res.data;
        }
      });
    }
  }

  getDoctorSlotConfiguration(): void {
    if (this.doctorId) {
      this._doctorService.getDoctorSlotConfigurationByDoctorId(this.doctorId).subscribe((res: { data: DoctorSlotConfiguration[] }) => {
        if (res.data) {
          this.doctorSlotConfigurationForm.patchValue(res.data);
          this.doctorSlotConfigurationForm.disable();
        } else {
          this.doctorCertificationForm.reset();
        }
      });
    }
  }

  getDoctorAvailability(): void {
    if (this.doctorId) {
      this._doctorService
        .getDoctorAvailabilityByDoctorId(this.doctorId)
        .subscribe((res: IDoctorAvailability) => {
          if (res.data) {
            if (res.data) {
              this.doctorAvailability =
                this.sortAvailabilityByWeekDay(
                  res.data
                );
            }
            // this.doctorAvailability = res.data;
            // console.log(this.doctorAvailability);
          }
        });
    }
  }

  getBookedAppointment(): void {
    if (this.doctorId) {
      console.log(this.doctorId);
      this._appointmentBookService.getAppointmentBookingByDoctorId(this.doctorId).subscribe((res: IAppointment) => {
        if (res.success) {
          this.bookedAppointments = res.data.sort((a: any, b: any) => {
            const numA = Number(a.appointmentNumber.replace('APT-', ''));
            const numB = Number(b.appointmentNumber.replace('APT-', ''));
            return numA - numB; // Ascending
          });
          this.setupPagination();
        }
      });
    }
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.bookedAppointments.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.paginatedAppointments =
      this.bookedAppointments.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.updatePaginatedData();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }


  calculateMinutes(startTime: string, endTime: string): number {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startTotalMinutes = startHour * 60 + startMin;
    const endTotalMinutes = endHour * 60 + endMin;
    return endTotalMinutes - startTotalMinutes;
  }

  getAppointmentTypeClass(type: string): string {
    const appointmentType = type?.toLowerCase();

    switch (appointmentType) {
      case 'in-person':
      case 'in person':
        return 'type-inperson';

      case 'telemedicine':
      case 'virtual':
      case 'video consultation':
        return 'type-telemedicine';

      default:
        return 'type-default';
    }
  }

  getAppointmentConsultationModeClass(type: string): string {
    const mode = type?.toLowerCase();

    switch (mode) {
      case 'newperson':
      case 'new patient':
        return 'mode-newpatient';

      case 'follow-up':
      case 'follow up':
        return 'mode-followup';

      case 'emergency':
        return 'mode-emergency';

      default:
        return 'mode-default';
    }
  }

  getAppointmentStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'confirmed':
        return 'confirmed';
      case 'checked-in':
        return 'checked-in';
      case 'completed':
        return 'completed';
      case 'cancelled':
        return 'cancelled';
      case 'no-show':
        return 'no-show';
      default:
        return 'default-status';
    }
  }

  public editAppointment(appointment: IAppointmentDetails): void {
    this.sidebar()?.openRightSidebar('', 'edit-appointment', appointment);
  }

  private sortAvailabilityByWeekDay(availability: IDoctorAvailabilityDetails[]): IDoctorAvailabilityDetails[] {
    return availability.sort(
      (a, b) =>
        this.dayOrder.indexOf(a.dayOfWeek) -
        this.dayOrder.indexOf(b.dayOfWeek)
    );
  }


  public primarySpecialities: IPrimarySpecialityData[] = [];
  getAllPrimarySpecialities(): void {
    this._primarySpecialityService.getAllPrimarySpeciality().subscribe({
      next: (res: IPrimarySpeciality) => {
        this.primarySpecialities = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching primary specialities:', err);
        this.primarySpecialities = [];
      }
    });
  }

  refresh(): void {
    this.getDoctorProfile();
    this.getBookedAppointment();
  }

  editDoctor(doctor: IDoctorByIdData | null): void {
    if (doctor) {
      this.sidebar()?.openRightSidebar('', 'doctor', doctor);
    }
  }

  bookAppointment(doctor: IDoctorByIdData | null): void {
    this._modalService.openComponentModal(AppointmentBooking,
      {
        class: 'modal-dialog-centered modal-lg',
        backdrop: 'static',
        keyboard: false,
        initialState: {
          doctorDetails: doctor,
        }
      }
    );
  }

  public isEdit: boolean = false
  openEducaionPopup(): void {
    this.isEdit = false;
    this._modalService.openModal('EducaionModal');
  }
  addEducaion(): void {
    if (this.isEdit) {
      this._doctorService.updateDoctorEducation(`${this.selectedEducaionId}`, this.doctorEducaionForm.value).subscribe((res: IDoctorQualification) => {
        if (res.success) {
          this.selectedEducaionId = '';
          this.doctorEducaionForm.reset();
          this.getDoctorEducaions();
          this._modalService.closeModal('EducaionModal');
        }
      })
    } else {
      this._doctorService.addDoctorEducation(this.doctorEducaionForm.value).subscribe((res: IDoctorQualification) => {
        if (res.success) {
          this.selectedEducaionId = '';
          this.doctorEducaionForm.reset();
          this.getDoctorEducaions();
          this._modalService.closeModal('EducaionModal');
        }
      });
    }
  }

  public selectedEducaionId = ''
  editEducation(educaion: IDoctorQualificationDetails): void {
    console.log(educaion);
    this.selectedEducaionId = educaion._id
    this.isEdit = true;
    this.doctorEducaionForm.patchValue(educaion);
    this._modalService.openModal('EducaionModal');
  }
  deleteEducaion(educaion: IDoctorQualificationDetails): void {
    this.selectedEducaionId = educaion._id
    this._doctorService.deleteDoctorEducation(`${this.selectedEducaionId}`).subscribe((res: IDoctorQualification) => {
      if (res.success) {
        this.selectedEducaionId = '';
        this.doctorEducaionForm.reset();
        this.getDoctorEducaions();
        this._modalService.closeModal('EducaionModal');
      }
    })
  }

  openWorkExperiencePopup(): void {
    this._modalService.openModal('WorkExperienceModal');
  }

  addDoctorWorkExperience(): void {
    console.log(this.doctorWorkExperienceForm.value);
    if (this.isEdit) {
      this._doctorService.updateDoctorWorkExperience(`${this.selectedWorkExperienceId}`, this.doctorWorkExperienceForm.value).subscribe((res: IDoctorQualification) => {
        if (res.success) {
          this.selectedWorkExperienceId = '';
          this.doctorWorkExperienceForm.reset();
          this.getDoctorWorkExperience();
          this._modalService.closeModal('WorkExperienceModal');
        }
      })
    } else {
      this._doctorService.addDoctorWorkExperience(this.doctorWorkExperienceForm.value).subscribe((res: any) => {
        if (res.success) {
          this.selectedWorkExperienceId = '';
          this.doctorWorkExperienceForm.reset();
          this.getDoctorWorkExperience();
          this._modalService.closeModal('WorkExperienceModal');
        }
      });
    }
  }

  public selectedWorkExperienceId = ''
  editWorkExperience(workexperience: IDoctorWorkExperienceDetails): void {
    this.selectedWorkExperienceId = workexperience._id
    this.isEdit = true;
    this.doctorWorkExperienceForm.patchValue(workexperience);
    this._modalService.openModal('WorkExperienceModal');
  }
  deleteWorkExperience(workexperience: IDoctorWorkExperienceDetails): void {
    this.selectedEducaionId = workexperience._id
    this._doctorService.deleteDoctorEducation(`${this.selectedWorkExperienceId}`).subscribe((res: IDoctorWorkExperience) => {
      if (res.success) {
        this.selectedWorkExperienceId = '';
        this.doctorWorkExperienceForm.reset();
        this.getDoctorWorkExperience();
        this._modalService.closeModal('WorkExperienceModal');
      }
    });
  }

  /**
 * Generate Unique Dummy Work Experience Data
 */
  public generateDummyWorkExperience(): void {
    const hospitals = [
      'Apollo Hospital',
      'Fortis Healthcare',
      'AIIMS Delhi',
      'Sterling Hospital',
      'Sunshine Medical Center',
      'Global Hospital',
      'Care Hospital',
      'Zydus Hospital',
      'Unity Health Center',
      'City Heart Institute'
    ];

    const designations = [
      'Consultant Cardiologist',
      'Senior Surgeon',
      'Medical Officer',
      'Resident Doctor',
      'Neurologist',
      'Orthopedic Specialist',
      'Pediatrician',
      'Dermatologist',
      'ENT Specialist',
      'Radiologist'
    ];

    const departments = [
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Emergency',
      'ICU',
      'Pediatrics',
      'Dermatology',
      'ENT',
      'Radiology',
      'General Medicine'
    ];

    const locations = [
      'Ahmedabad',
      'Surat',
      'Mumbai',
      'Delhi',
      'Bangalore',
      'Pune',
      'Chennai',
      'Hyderabad',
      'Kolkata',
      'Jaipur'
    ];

    const achievements = [
      'Best Doctor Award',
      'Handled 500+ Surgeries',
      'Published Research Paper',
      'Gold Medalist',
      'Patient Excellence Award',
      'Top Consultant',
      'Covid Frontline Warrior',
      'National Medical Speaker'
    ];

    const descriptions = [
      'Managed critical patients and emergency cases.',
      'Worked with multidisciplinary medical teams.',
      'Specialized in advanced surgical procedures.',
      'Handled OPD and inpatient responsibilities.',
      'Experienced in ICU and trauma care.',
      'Conducted medical awareness programs.',
      'Managed high-risk operations successfully.',
      'Provided patient-centered healthcare services.'
    ];

    const employmentTypes = [
      'Full Time',
      'Part Time',
      'Consultant',
      'Visiting',
      'Internship',
      'Residency'
    ];

    /* -------------------------------------------------------------------------- */
    /*                        Random Unique Generator                              */
    /* -------------------------------------------------------------------------- */

    const randomNumber = Math.floor(Math.random() * 10000);

    const hospital =
      hospitals[Math.floor(Math.random() * hospitals.length)];

    const designation =
      designations[Math.floor(Math.random() * designations.length)];

    const department =
      departments[Math.floor(Math.random() * departments.length)];

    const location =
      locations[Math.floor(Math.random() * locations.length)];

    const achievement =
      achievements[Math.floor(Math.random() * achievements.length)];

    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];

    const employmentType =
      employmentTypes[
      Math.floor(Math.random() * employmentTypes.length)
      ];

    const startYear = 2015 + Math.floor(Math.random() * 8);

    const endYear = startYear + Math.floor(Math.random() * 3);

    /* -------------------------------------------------------------------------- */
    /*                                Patch Form                                  */
    /* -------------------------------------------------------------------------- */

    this.doctorWorkExperienceForm.patchValue({

      doctorId: this.doctorId,

      hospitalName: `${hospital} ${randomNumber}`,

      designation: designation,

      employmentType: employmentType,

      department: department,

      startDate: `${startYear}-01-01`,

      endDate: `${endYear}-12-31`,

      currentlyWorking: Math.random() > 0.5,

      location: location,

      description: `${description} Ref-${randomNumber}`,

      achievements: `${achievement} ${randomNumber}`,

      displayOrder: Math.floor(Math.random() * 20),

    });

    console.log(
      'Generated Dummy Work Experience:',
      this.doctorWorkExperienceForm.value
    );
  }

  generateDummyEducationData(): any {
    const degrees = [
      'MBBS',
      'MD General Medicine',
      'MS General Surgery',
      'DM Cardiology',
      'MCh Neurosurgery',
      'DNB Pediatrics',
      'Diploma in Orthopedics',
      'Fellowship in Critical Care',
      'Certificate in Diabetes Management'
    ];

    const educationTypes = [
      'Undergraduate',
      'Postgraduate',
      'Super Specialization',
      'Fellowship',
      'Certification',
      'Diploma'
    ];

    const institutes = [
      'AIIMS New Delhi',
      'Christian Medical College',
      'King George Medical University',
      'BJ Medical College',
      'Grant Medical College',
      'Government Medical College Surat',
      'Seth GS Medical College'
    ];

    const universities = [
      'Delhi University',
      'Gujarat University',
      'Maharaja Sayajirao University',
      'Mumbai University',
      'Dr. MGR Medical University'
    ];

    const achievements = [
      'Gold Medalist',
      'University Topper',
      'Best Research Paper Award',
      'Distinction',
      'Dean\'s List',
      'Merit Scholarship'
    ];

    const descriptions = [
      'Completed with distinction and strong academic performance.',
      'Focused on advanced clinical practice and patient care.',
      'Specialized training in diagnosis and treatment.',
      'Participated in multiple research and healthcare projects.',
      'Successfully completed residency with excellent outcomes.'
    ];

    const randomId = Date.now();

    const startYear = 2005 + Math.floor(Math.random() * 15);
    const endYear = startYear + (2 + Math.floor(Math.random() * 4));

    return {
      doctorId: this.doctorId,
      degreeName: degrees[Math.floor(Math.random() * degrees.length)],
      educationType: educationTypes[Math.floor(Math.random() * educationTypes.length)],
      specializations:
        this.primarySpecialities[
          Math.floor(Math.random() * this.primarySpecialities.length)
        ]?.name || 'General Medicine',
      instituteName:
        institutes[Math.floor(Math.random() * institutes.length)] +
        ' #' +
        randomId,
      universityName:
        universities[Math.floor(Math.random() * universities.length)],
      startYear,
      endYear,
      grade: ['A+', 'A', 'B+', 'Distinction', 'First Class'][Math.floor(Math.random() * 5)],
      achievement:
        achievements[Math.floor(Math.random() * achievements.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)]
    };
  }

  patchDummyEducationData(): void {
    this.doctorEducaionForm.patchValue(
      this.generateDummyEducationData()
    );
  }

  openleaveLeavePopup(): void {
    this._modalService.openModal('LeaveModal');
  }

  addLeave(): void {
    this._doctorService.addDoctorLeave(this.doctorLeaveForm.value).subscribe((res: IDoctorLeaveResponse) => {
      if (res.success) {
        this.doctorLeaveForm.reset();
        this.getDoctorLeaves();
        this._modalService.closeModal('LeaveModal');
      }
    })
  }

  generateDummyLeaveData(): any {
    const leaveTypes = [
      'Traning',
      'Holiday',
      'Confernce'
    ];

    const leaveReasons = [
      'Attending advanced surgical training program.',
      'Annual family vacation leave.',
      'Participating in an international medical conference.',
      'Continuing medical education workshop.',
      'Research presentation at healthcare summit.',
      'Professional development training session.',
      'Personal vacation leave.',
      'National medical association conference.'
    ];

    const leaveType =
      leaveTypes[Math.floor(Math.random() * leaveTypes.length)];

    // Generate a future start date (within next 180 days)
    const startDate = new Date();
    startDate.setDate(
      startDate.getDate() + Math.floor(Math.random() * 180)
    );

    // Leave duration between 1 and 10 days
    const duration = Math.floor(Math.random() * 10) + 1;

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration);

    return {
      leaveType,
      leaveStartDate: this.formatDate(startDate),
      leaveEndDate: this.formatDate(endDate),
      leaveReason:
        leaveReasons[Math.floor(Math.random() * leaveReasons.length)]
    };
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  patchDummyLeaveData(): void {
    this.doctorLeaveForm.patchValue(
      this.generateDummyLeaveData()
    );
  }


  openCertificaionPopup(): void {
    this._modalService.openModal('CertificaionModal');
  }

  onCertificateUpload(event: any): void {

  }

  generateDummyCertificationData(): any {
    const certificates = [
      'MCI Registration',
      'ACLS Certification',
      'BLS Certification',
      'EAPCI Fellowship',
      'Advanced Trauma Life Support',
      'Fellowship in Cardiology',
      'Diabetes Management Certification',
      'Critical Care Certification',
      'Advanced Laparoscopic Surgery Certification'
    ];

    const issuingBodies = [
      'Medical Council of India',
      'National Medical Commission',
      'American Heart Association',
      'Indian Resuscitation Council',
      'European Assoc. of PCI',
      'Royal College of Physicians',
      'Apollo MedSkills',
      'Indian Medical Association'
    ];

    const remarks = [
      'Successfully completed certification requirements.',
      'Certification verified by issuing authority.',
      'Maintained active status through continuous education.',
      'Recognized for excellence during certification program.',
      'Certification renewed successfully.'
    ];

    const statuses = [
      'Valid',
      'Renewal Due',
      'Expired'
    ];

    const isLifetime = Math.random() > 0.7;

    const issuedDate = new Date(
      2010 + Math.floor(Math.random() * 15),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );

    let expiryDate = null;

    if (!isLifetime) {
      expiryDate = new Date(issuedDate);
      expiryDate.setFullYear(
        issuedDate.getFullYear() +
        (2 + Math.floor(Math.random() * 5))
      );
    }

    const certificateNumber =
      `CERT-${Date.now()}-${Math.floor(Math.random() * 9999)}`;

    return {
      certificateName:
        certificates[Math.floor(Math.random() * certificates.length)],

      issuingBody:
        issuingBodies[Math.floor(Math.random() * issuingBodies.length)],

      certificateNumber,

      issuedDate: this.formatDate(issuedDate),

      expiryDate: expiryDate
        ? this.formatDate(expiryDate)
        : null,

      isLifetime,

      status: isLifetime
        ? 'Valid'
        : statuses[Math.floor(Math.random() * statuses.length)],

      documentUrl: '',

      remarks:
        remarks[Math.floor(Math.random() * remarks.length)]
    };
  }

  patchDummyCertificationData(): void {
    this.doctorCertificationForm.patchValue(
      this.generateDummyCertificationData()
    );
  }

  addCertification(): void {
    this._doctorService.addDoctorCertification(this.doctorCertificationForm.value).subscribe((res: IDoctorCertifcicaion) => {
      if (res.success) {
        this.doctorCertificationForm.reset();
        this.getDoctorCertificaion();
        this._modalService.closeModal('CertificaionModal');
      }
    })
  }

  selectedCertificaionId: string = '';
  editCertificaion(certificaion: IDoctorCertifcicaionDetails): void {
    this.selectedCertificaionId = certificaion._id;
    this.isEdit = true;
    this.doctorCertificationForm.patchValue(certificaion);
    this._modalService.openModal('CertificaionModal');
  }

  deleteCertificaion(certificaion: IDoctorCertifcicaionDetails): void {
    this.selectedCertificaionId = certificaion._id;
    this._notificationServices
      .confirm(
        'This record will be permanently deleted.',
        'Delete Record?',
        {
          confirmText: 'Delete',
          cancelText: 'Cancel'
        }
      )
      .then((result) => {
        if (result.isConfirmed) {
          this._doctorService.deleteDoctorCertification(`${this.selectedCertificaionId}`).subscribe((res: IDoctorCertifcicaion) => {
            if (res.success) {
              this.selectedCertificaionId = '';
              this.doctorCertificationForm.reset();
              this.getDoctorCertificaion();
              this._modalService.closeModal('CertificaionModal');
            }
          });
        }
      });
  }


  openPublicaionPopup(): void {
    this._modalService.openModal('PublicaionModal');
  }

  generateDummyPublicationData() {
    const publications = [
      {
        title:
          'Outcomes of Primary PCI in STEMI patients in rural India',
        journalName:
          'Indian Heart Journal',
        publicationYear: 2022,
        authorRole: 'Co-author'
      },
      {
        title:
          'Long-term efficacy of drug-eluting stents in diabetes patients',
        journalName:
          'Journal of Cardiology',
        publicationYear: 2019,
        authorRole: 'Lead Author'
      },
      {
        title:
          'Device therapy for Heart Failure: A meta-analysis',
        journalName:
          'European Heart Journal',
        publicationYear: 2017,
        authorRole:
          'Contributing Author'
      }
    ];

    const item =
      publications[
      Math.floor(
        Math.random() *
        publications.length
      )
      ];

    return {
      ...item,
      doctorId: this.doctorId,
      doi: `10.1000/${Date.now()}`,
      publicationUrl:
        'https://pubmed.ncbi.nlm.nih.gov',
      abstract:
        'This publication evaluates clinical outcomes and evidence-based treatment approaches.'
    };
  }

  patchDummyPublicationData() {
    this.doctorPublicationForm.patchValue(
      this.generateDummyPublicationData()
    );
  }

  addPublication(): void {
    if (this.isEdit) {
      this._doctorService.updateDoctorPublication(this.selectedPublicaionId, this.doctorPublicationForm.value).subscribe((res: IDoctorPublicaion) => {
        if (res.success) {
          this.doctorPublicationForm.reset();
          this.getDoctorPublicaion();
          this._modalService.closeModal('PublicaionModal');
        }
      });
    } else {
      this._doctorService.addDoctorPublication(this.doctorPublicationForm.value).subscribe((res: IDoctorPublicaion) => {
        if (res.success) {
          this.doctorPublicationForm.reset();
          this.getDoctorPublicaion();
          this._modalService.closeModal('PublicaionModal');
        }
      });
    }
  }


  selectedPublicaionId: string = '';
  editPublication(publication: IDoctorPublicaionDetails): void {
    this.selectedPublicaionId = publication._id;
    this.isEdit = true;
    this.doctorPublicationForm.patchValue(publication);
    this._modalService.openModal('PublicaionModal');
  }

  deletePublicaion(publication: IDoctorPublicaionDetails): void {
    this.selectedPublicaionId = publication._id;
    this._notificationServices
      .confirm(
        'This record will be permanently deleted.',
        'Delete Record?',
        {
          confirmText: 'Delete',
          cancelText: 'Cancel'
        }
      )
      .then((result) => {
        if (result.isConfirmed) {
          this._doctorService.deleteDoctorPublication(`${this.selectedPublicaionId}`).subscribe((res: IDoctorQualification) => {
            if (res.success) {
              this.selectedPublicaionId = '';
              this.doctorPublicationForm.reset();
              this.getDoctorPublicaion();
              this._modalService.closeModal('PublicaionModal');
            }
          });
        }
      });
  }

  addSlotConfiguraiton(): void {
    this._doctorService.addDoctorSlotConfiguration(this.doctorSlotConfigurationForm.value).subscribe((res: IDoctorQualification) => {
      if (res.success) {
        this.doctorSlotConfigurationForm.reset();
      }
    });
  }

  addShift(): void {
    this.shifts.push(
      this.createShiftFormGroup()
    );
  }

  removeShift(index: number): void {
    if (this.shifts.length > 1) {
      this.shifts.removeAt(index);
    }
  }

  openAvailabilityPopup(): void {
    this._modalService.openModal('AvailabilityModal');
  }

  closeAvailabilityPopup(): void {
    this.getDoctorAvailability();
    this._modalService.closeModal('AvailabilityModal');
  }


  addAvailability(): void {
    // console.log(this.doctorAvailabilityForm.value);
    this._doctorService.addDoctorAvailability(this.doctorAvailabilityForm.value).subscribe((res: IDoctorAvailability) => {
      console.log(res);
      if (res.success) {
        this.doctorAvailabilityForm.reset();
        this.doctorAvailabilityForm.patchValue({
          doctorId: this.doctorId,
        })
      }
    });
  }

  backToView(): void {
    this.router.navigate(['/layout/doctors/master/doctor-list']);
  }
}
