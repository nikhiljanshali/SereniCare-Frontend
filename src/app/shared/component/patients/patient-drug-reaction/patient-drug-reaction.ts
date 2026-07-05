import { NotificationServices } from '../../../../core/services/notification-services';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonMethod } from '../../../../core/services/common-method';
import { MedicineService } from '../../../../core/services/medicine-services';
import { PatientDrugReactionService } from '../../../../core/services/patient-drug-reaction';
import { IAdverseDrugReactionDetails } from '../../../../core/interface/basic.interface';
import { ModalService } from '../../../../core/services/modal-service';

@Component({
  selector: 'app-patient-drug-reaction',
  standalone: false,
  // imports: [],
  templateUrl: './patient-drug-reaction.html',
  styleUrl: './patient-drug-reaction.css',
})
export class PatientDrugReaction {

  @Input() hideList: boolean = false;
  @Input() patientId: string | null = null;
  public returnResult = new EventEmitter<any>()

  public patientDrugReactionForm!: FormGroup;
  public medicineList: any[] = [];
  public patientDrugReactionList: IAdverseDrugReactionDetails[] = [];
  // private patientId: string | null = null;
  public showView: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _medicineService: MedicineService,
    private _notificationServices: NotificationServices,
    private _patientDrugReaction: PatientDrugReactionService,
    private _commonMethod: CommonMethod,
    public _modalService: ModalService
  ) {
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('patientId');
    });
  }

  ngOnInit() {
    this.initForm();
    this.loadMasterData();
    // this.setupAllergyToggle();
  }

  private loadMasterData(): void {
    if (!this.hideList) {
      this._patientDrugReaction.getPatientDrugReactionByPatientId(this.patientId ?? '').subscribe({
        next: (res) => {
          this.patientDrugReactionList = res.data;
        }
      });
    }
    forkJoin({
      medicines: this._medicineService.getAllMedicines(),
    }).subscribe({
      next: ({ medicines }) => {
        this.medicineList = medicines.data;
      },
      error: (err) => console.error(err)
    });
  }


  initForm() {
    this.patientDrugReactionForm = this.fb.group({
      patientId: [this.patientId],
      subject: ['', Validators.required],
      medicineCode: ['', Validators.required],
      medicineName: ['', Validators.required],
      adrDetails: ['', Validators.required],
      adrDate: ['', Validators.required],
      ovrNumber: ['', Validators.required],
    });
  }


  public onMedicineChange(): void {
    const selectedMedicine = this.patientDrugReactionForm.get('medicineCode')?.value;
    if (!selectedMedicine) {
      this.patientDrugReactionForm.patchValue({
        medicineName: '',
        adrDetails: '',
        adrDate: '',
        ovrNumber: ''
      });
      return;
    }
    const today = new Date();
    const date =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, '0') +
      String(today.getDate()).padStart(2, '0');

    const ovrNumber = `OVR-${selectedMedicine.medicineCode}-${date}`;
    const adrDetails = `ADR-${selectedMedicine.medicineName}-${selectedMedicine.medicineCode}-${date}`;
    const adrDate = new Date().toISOString().split('T')[0];

    this.patientDrugReactionForm.patchValue({
      medicineName: selectedMedicine.medicineName,
      adrDetails: adrDetails ?? '',
      adrDate: adrDate,
      ovrNumber: ovrNumber
    });
    console.log(selectedMedicine);
  }

  public savePatientDrugReaction(): void {
    if (this.patientDrugReactionForm.invalid) {
      this.patientDrugReactionForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.patientDrugReactionForm);
      return;
    }
    if (!this.isEdit) {
      const payload = this.patientDrugReactionForm.value;;
      console.log(payload);
      // return;
      this._patientDrugReaction.createPatientDrugReaction(payload).subscribe(() => {
        this.showView = true;
        this.loadMasterData();
        this.patientDrugReactionForm.reset();
        this.patientDrugReactionForm.patchValue({
          patientId: this.patientId
        })
        this.loadMasterData();
        if (this.hideList) {
          this.returnResult.emit(true);
          this._modalService.closeComponentModal();
        }
      });
    } else {
      const payload = this.patientDrugReactionForm.value;
      this._patientDrugReaction.updatePatientDrugReaction(this.selectedPatientAllergeis._id, payload).subscribe(() => {
        this.showView = true;
        this.isEdit = false;
        this.patientDrugReactionForm.reset();
        this.patientDrugReactionForm.patchValue({
          patientId: this.patientId
        })
        this.loadMasterData();
      });
    }
  }

  public getStatusClass(status: string): string {
    const classes: any = {
      'Active': 'status-active',
      'Resolved': 'status-resolved',
      'Chronic': 'status-chronic',
      'In Remission': 'status-remission'
    };
    return classes[status] || '';
  }

  public getSeverityClass(severity: string): string {
    const classes: Record<string, string> = {
      'Mild': 'severity-mild',
      'Moderate': 'severity-moderate',
      'Severe': 'severity-severe',
      'Critical': 'severity-critical'
    };

    return classes[severity] || '';
  }

  public getOutcomeClass(outcome: string): string {
    const classes: Record<string, string> = {
      'Recovered': 'outcome-recovered',
      'Improved': 'outcome-improved',
      'Stable': 'outcome-stable',
      'Worsened': 'outcome-worsened',
      'Under Treatment': 'outcome-treatment'
    };

    return classes[outcome] || '';
  }

  public toggleView(): void {
    this.showView = !this.showView;
    this.patientDrugReactionForm.reset();
    this.patientDrugReactionForm.patchValue({
      patientId: this.patientId
    });
  }


  public isEdit: boolean = false;
  public selectedPatientAllergeis: any;
  public editPatientDrugReaction(patientAllergies: any): void {
    this.selectedPatientAllergeis = patientAllergies;
    this.showView = false;
    this.isEdit = true;
    const selectedMedicine = this.medicineList.find((med: any) => med.medicineName === this.selectedPatientAllergeis.medicineName);
    this.patientDrugReactionForm.patchValue({
      ...patientAllergies,
      medicineCode: selectedMedicine ?? null,
      adrDate: this._commonMethod.formatDateForInput(patientAllergies.adrDate)
    });
  }

  public deletePatientDrugReaction(patientAllergies: any): void {
    this._notificationServices.confirm('Delete', 'Are you sure you want to delete this record?').then((result) => {
      if (result.isConfirmed) {
        this._patientDrugReaction.deletePatientDrugReaction(patientAllergies._id).subscribe(() => {
          this.loadMasterData();
        })
      }
    });
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }
  public refresh(): void {
    this.loadMasterData();
  }
}
