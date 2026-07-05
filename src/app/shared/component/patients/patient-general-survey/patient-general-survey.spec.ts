import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@shared/component/patients/patient-general-survey/patient-general-survey.ts';

describe('PatientGeneralSurvey', () => {
  let component: PatientGeneralSurvey;
  let fixture: ComponentFixture<PatientGeneralSurvey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientGeneralSurvey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientGeneralSurvey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
