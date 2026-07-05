import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@shared/component/patients/patient-risk/patient-risk.ts';

describe('PatientRisk', () => {
  let component: PatientRisk;
  let fixture: ComponentFixture<PatientRisk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRisk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRisk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
