import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonMethod } from '../../../../core/services/common-method';
import { DoctorService } from '../../../../core/services/doctor';
import { ModalService } from '../../../../core/services/modal-service';
import { StorageOperation } from '../../../../core/services/storage-operation';
import { EXAMINATION_MASTER } from '../../../../shared/methods/pe-request.method';
import { SideBarPatientHeader } from '../../../../shared/component/side-bar-patient-header/side-bar-patient-header';

@Component({
  selector: 'app-patient-hip-details',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, SideBarPatientHeader],
  templateUrl: './patient-hip-details.html',
  styleUrl: './patient-hip-details.css',
})
export class PatientHipDetails {

  @Input() patientDetails: any;
  public historyofPresentIllnessForm!: FormGroup;

  public OnsetOptions = EXAMINATION_MASTER.OnsetOptions;
  public CharacterOptions = EXAMINATION_MASTER.CharacterOptions;
  public TimingOptions = EXAMINATION_MASTER.TimingOptions;
  public ProgressionOptions = EXAMINATION_MASTER.ProgressionOptions;
  public SeverityOptions = EXAMINATION_MASTER.SeverityOptions;
  public PreviousEpisodeOptions = EXAMINATION_MASTER.PreviousEpisodeOptions;
  public ResponseToTreatmentOptions = EXAMINATION_MASTER.ResponseToTreatmentOptions;
  public AssociatedSymptomsOptions = EXAMINATION_MASTER.AssociatedSymptomsOptions;


  constructor(
    private fb: FormBuilder,
    private _doctorService: DoctorService,
    private _storageOperation: StorageOperation,
    private _commonMethod: CommonMethod,
    public _modalService: ModalService,
  ) {
    const storedUser = this._storageOperation.get<any>('user');
    const storedUserDetails = this._storageOperation.get<any>('userDetails');
    // console.log(storedUser.role, storedUserDetails);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.historyofPresentIllnessForm = this.fb.group({
      doctorId: [{ value: this._storageOperation.get<any>('userDetails').id, disabled: false }, [Validators.required]],
      patientId: [{ value: this.patientDetails?.patient?._id, disabled: false }, [Validators.required]],
      appointmentId: [{ value: this.patientDetails?.appointment?._id, disabled: false }, [Validators.required]],
      complaint: [{ value: '', disabled: false }, [Validators.required]],
      historyOfPresentIllness: [{ value: '', disabled: false }, [Validators.required]],
      onset: [{ value: '', disabled: false }, [Validators.required]],
      location: [{ value: '', disabled: false }, [Validators.required]],
      duration: [{ value: '', disabled: false }, [Validators.required]],
      character: [{ value: '', disabled: false }, [Validators.required]],
      severity: [{ value: '', disabled: false }, [Validators.required]],
      radiation: [{ value: '', disabled: false }, [Validators.required]],
      timing: [{ value: '', disabled: false }, [Validators.required]],
      aggravatingFactors: [{ value: '', disabled: false }, [Validators.required]],
      relievingFactors: [{ value: '', disabled: false }, [Validators.required]],
      associatedSymptoms: [{ value: '', disabled: false }, [Validators.required]],
      progression: [{ value: '', disabled: false }, [Validators.required]],
      previousEpisodes: [{ value: '', disabled: false }, [Validators.required]],
      treatmentsTried: [{ value: '', disabled: false }, [Validators.required]],
      responseToTreatment: [{ value: '', disabled: false }, [Validators.required]],
      additionalNotes: [{ value: '', disabled: false }, [Validators.required]],
    });
    this.loadDummyHistoryOfPresentIllness();
  }


  public onCheckboxChange(event: Event, controlName: string, value: string): void {
    const control = this.historyofPresentIllnessForm.get(controlName);

    if (!control) {
      return;
    }

    const selectedValues: string[] = [...(control.value || [])];
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!selectedValues.includes(value)) {
        selectedValues.push(value);
      }
    } else {
      const index = selectedValues.indexOf(value);
      if (index > -1) {
        selectedValues.splice(index, 1);
      }
    }

    control.setValue(selectedValues);
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  public isCheckboxSelected(controlName: string, value: string): boolean {
    const selectedValues: string[] = this.historyofPresentIllnessForm.get(controlName)?.value || [];
    return selectedValues.includes(value);
  }

  public saveChiefOfComplaints(): void {
    if (this.historyofPresentIllnessForm.invalid) {
      this.historyofPresentIllnessForm.markAllAsTouched();
      this._commonMethod.logInvalidControls(this.historyofPresentIllnessForm);
      return;
    }
    const formValue = this.historyofPresentIllnessForm.value;
    const payload = { ...formValue };
    this._doctorService.createHistoryOfPresentIllness(payload).subscribe((res: any) => {
      this.resetForm();
    })
  }


  public resetForm(): void {
    this.historyofPresentIllnessForm.reset();

    this.historyofPresentIllnessForm.patchValue({
      doctorId: this._storageOperation.get<any>('userDetails').id,
      patientId: this.patientDetails?.patient?._id,
      appointmentId: this.patientDetails?.appointment?._id,
      isActive: true
    });
  }

  public loadDummyHistoryOfPresentIllness(): void {

    const randomItem = <T>(items: T[]): T =>
      items[Math.floor(Math.random() * items.length)];

    const randomItems = (items: string[], min = 2, max = 4): string[] => {
      const shuffled = [...items].sort(() => Math.random() - 0.5);
      const count = Math.floor(Math.random() * (max - min + 1)) + min;
      return shuffled.slice(0, count);
    };

    const complaints = [
      'Chest Pain',
      'Headache',
      'Abdominal Pain',
      'Fever',
      'Shortness of Breath',
      'Back Pain',
      'Cough',
      'Dizziness',
      'Vomiting',
      'Joint Pain'
    ];

    const locations = [
      'Central Chest',
      'Left Chest',
      'Head',
      'Abdomen',
      'Lower Back',
      'Neck',
      'Right Shoulder',
      'Left Leg'
    ];

    const durations = [
      '30 Minutes',
      '2 Hours',
      '6 Hours',
      '1 Day',
      '3 Days',
      '1 Week'
    ];

    const characters = [
      'Sharp',
      'Dull',
      'Burning',
      'Throbbing',
      'Cramping',
      'Stabbing',
      'Pressure'
    ];

    const radiations = [
      'Left Arm',
      'Back',
      'Neck',
      'Jaw',
      'Right Shoulder',
      'No Radiation'
    ];

    const timings = [
      'Constant',
      'Intermittent',
      'Occasional',
      'Morning',
      'Night'
    ];

    const progressions = [
      'Improving',
      'Worsening',
      'Unchanged'
    ];

    const previousEpisodes = [
      'Yes',
      'No'
    ];

    const associatedSymptomsPool = [
      'Chest Pain',
      'Shortness of Breath',
      'Sweating',
      'Nausea',
      'Vomiting',
      'Dizziness',
      'Palpitations',
      'Fever',
      'Cough',
      'Fatigue',
      'Headache'
    ];

    const aggravatingFactors = [
      'Walking',
      'Climbing Stairs',
      'Deep Breathing',
      'Exercise',
      'Eating',
      'Coughing'
    ];

    const relievingFactors = [
      'Rest',
      'Sitting',
      'Lying Down',
      'Medication',
      'Deep Breathing'
    ];

    const treatments = [
      'Paracetamol',
      'Ibuprofen',
      'Antacid',
      'Home Rest',
      'Cold Compress',
      'Warm Compress'
    ];

    const responses = [
      'Improved',
      'Minimal Improvement',
      'No Relief',
      'Symptoms Worsened'
    ];

    const complaint = randomItem(complaints);
    const onset = randomItem(['Sudden', 'Gradual']);
    const location = randomItem(locations);
    const duration = randomItem(durations);
    const character = randomItem(characters);
    const severity = Math.floor(Math.random() * 10) + 1;
    const radiation = randomItem(radiations);
    const timing = randomItem(timings);
    const progression = randomItem(progressions);
    const previousEpisode = randomItem(previousEpisodes);

    this.historyofPresentIllnessForm.patchValue({
      doctorId: this._storageOperation.get<any>('userDetails').id,
      patientId: this.patientDetails?.patient?._id,
      appointmentId: this.patientDetails?.appointment?._id,

      complaint: complaint,

      historyOfPresentIllness:
        `Patient presented with ${onset.toLowerCase()} onset ${complaint.toLowerCase()} located at ${location}. Symptoms started ${duration.toLowerCase()} ago. Pain is ${character.toLowerCase()} in nature with severity ${severity}/10. Condition has been ${progression.toLowerCase()}.`,

      onset,
      location,
      duration,
      character,
      severity,
      radiation,
      timing,
      progression,
      previousEpisodes: previousEpisode,

      associatedSymptoms: randomItems(associatedSymptomsPool),

      aggravatingFactors: randomItems(aggravatingFactors).join(', '),

      relievingFactors: randomItems(relievingFactors).join(', '),

      treatmentsTried: randomItem(treatments),

      responseToTreatment: randomItem(responses),

      additionalNotes:
        `Patient is alert and cooperative. Clinical findings are consistent with ${complaint.toLowerCase()}. Further evaluation and appropriate investigations have been advised.`
    });
  }
}
