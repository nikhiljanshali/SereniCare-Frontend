import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalHistoryDetails } from './patient-medical-history-details';

describe('PatientMedicalHistoryDetails', () => {
  let component: PatientMedicalHistoryDetails;
  let fixture: ComponentFixture<PatientMedicalHistoryDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalHistoryDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalHistoryDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
