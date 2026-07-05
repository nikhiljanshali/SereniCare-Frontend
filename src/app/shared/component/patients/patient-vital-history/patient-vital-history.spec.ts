import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@shared/component/patients/patient-vital-history/patient-vital-history.ts';

describe('PatientVitalHistory', () => {
  let component: PatientVitalHistory;
  let fixture: ComponentFixture<PatientVitalHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientVitalHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientVitalHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
