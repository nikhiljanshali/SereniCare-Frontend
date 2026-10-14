import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../core/services/modal-service';
import { MedicalServices } from '../../../../core/services/medical-services';
import { IInsuranceTpaDetails, InsuranceTAPDetails, MedicalServicesDetails } from '../../../../core/interface/basic.interface';
import { InsuranceTpaService } from '../../../../core/services/insurace-tpa';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-tpa-override-rate',
  standalone: false,
  templateUrl: './add-tpa-override-rate.html',
  styleUrl: './add-tpa-override-rate.css',
})
export class AddTpaOverrideRate {

  public isEdit: boolean = false;
  public tpaOverritedRateSaved = new EventEmitter<any>()
  public insuranceTpaDetail: IInsuranceTpaDetails | null = null;

  public serviceTariffForm: FormGroup;
  public medicalServicesDetailsList: MedicalServicesDetails[] = [];
  public insuranceTpaList: InsuranceTAPDetails[] = [];

  // Options for Dropdowns
  public statusOptions: string[] = ['Active', 'Expired'];
  public servicesList: Array<{ _id: string; name: string }> = [];
  public insuranceProvidersList: Array<{ _id: string; name: string }> = [];

  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public _modalService: ModalService,
    public _medicalServices: MedicalServices,
    public _insuranceTpaService: InsuranceTpaService
  ) {
    this.serviceTariffForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  private patchMedicalService(service: IInsuranceTpaDetails): void {
    const serviceId = typeof service.service === 'string' ? service.service : service.service?._id ?? '';
    const insuranceProviderId = typeof service.insuranceProvider === 'string' ? service.insuranceProvider : service.insuranceProvider?._id ?? '';
    this.serviceTariffForm.patchValue({
      service: serviceId,
      insuranceProvider: insuranceProviderId,
      agreedRates: {
        opdRate: service.agreedRates?.opdRate ?? 0,
        ipdRate: service.agreedRates?.ipdRate ?? 0,
        emergencyRate: service.agreedRates?.emergencyRate ?? 0
      },
      preAuthRequired: service.preAuthRequired ?? false,
      effectiveFrom: this.toDateInputValue(service.effectiveFrom),
      effectiveTo: this.toDateInputValue(service.effectiveTo),
      status: service.status ?? 'Active',
      isActive: service.isActive ?? true
    });
  }

  private toDateInputValue(value?: string): string {
    return value ? value.substring(0, 10) : '';
  }

  public closeModePopup(): void {
    // Logic to close the modal popup
    this._modalService.closeComponentModal();
  }

  public loadInitialData(): void {
    this.isLoading = true;
    forkJoin({
      medicalServices: this._medicalServices.getAllServices(),
      insuranceTpas: this._insuranceTpaService.getAllInsuranceTPAs()
    }).subscribe({
      next: ({ medicalServices, insuranceTpas }) => {
        this.medicalServicesDetailsList = medicalServices.data;
        this.insuranceTpaList = insuranceTpas.data;
        this.isLoading = false;
        this.initForm();

        if (this.insuranceTpaDetail) {
          this.isEdit = true;
          this.patchMedicalService(this.insuranceTpaDetail);
        }
      },
      error: (error) => {
        console.error('Failed to load initial tariff data', error);
        this.isLoading = false;
      }
    });
  }

  private createForm(): FormGroup {
    const todayStr = new Date().toISOString().substring(0, 10);

    return this.fb.group({
      service: ['', [Validators.required]],
      insuranceProvider: ['', [Validators.required]],

      // Embedded nested schema: tariffRatesSchema
      agreedRates: this.fb.group({
        opdRate: [0, [Validators.required, Validators.min(0)]],
        ipdRate: [0, [Validators.required, Validators.min(0)]],
        emergencyRate: [0, [Validators.required, Validators.min(0)]]
      }),

      preAuthRequired: [false],
      effectiveFrom: [todayStr, [Validators.required]],
      effectiveTo: [todayStr, [Validators.required]],
      status: ['Active', [Validators.required]],
      isActive: [true]
    });
  }

  private initForm(): void {
    this.serviceTariffForm = this.createForm();
  }

  /* -------------------------------------------------------------------------- */
  /*                            Form Submit & Reset                             */
  /* -------------------------------------------------------------------------- */

  public onSubmit(): void {
    if (this.serviceTariffForm.invalid) {
      this.serviceTariffForm.markAllAsTouched();
      return;
    }

    const payload = this.serviceTariffForm.value;
    console.log('Service Tariff Payload:', payload);
    if (!this.isEdit) {
      this._medicalServices.createTariff(payload).subscribe({
        next: (res: any) => {
          console.log(res);
          this.tpaOverritedRateSaved.emit(true);
        }, error: (error) => {
          console.error('Error fetching doctor availability:', error);
        },
        complete: () => {
          // Notify parent
          this.tpaOverritedRateSaved.emit();
          this.closeModePopup();
        },
      });
    } else {
      const tpaID = this.insuranceTpaDetail?._id;
      if (!tpaID) {
        console.error('Service ID is missing');
        return;
      }
      this._medicalServices.updateTariff(tpaID, payload).subscribe({
        next: (res: any) => {
          console.log(res);
          this.tpaOverritedRateSaved.emit(true);
        },
        error: (error) => {
          console.error('Error updating medical service:', error);
        },
        complete: () => {
          this.isEdit = false;
          this.tpaOverritedRateSaved.emit();
          this.closeModePopup();
        }
      });
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                            Dummy Data Generator                            */
  /* -------------------------------------------------------------------------- */

  public generateDummyData(): void {
    const getRandomNumber = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

    this.serviceTariffForm.patchValue({
      service: this.servicesList[0]?._id || '650f1a2b3c4d5e6f7a8b9c0d',
      insuranceProvider: this.insuranceProvidersList[0]?._id || '650f9z8y7x6w5v4u3t2s1r0q',

      agreedRates: {
        opdRate: getRandomNumber(500, 2000),
        ipdRate: getRandomNumber(3000, 15000),
        emergencyRate: getRandomNumber(1500, 5000)
      },

      preAuthRequired: Math.random() > 0.5,
      effectiveFrom: startDate.toISOString().substring(0, 10),
      effectiveTo: endDate.toISOString().substring(0, 10),
      status: 'Active',
      isActive: true
    });
  }

}
