import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@features/patient/pages/patient-examination/patient-examination.ts';

describe('PatientExamination', () => {
  let component: PatientExamination;
  let fixture: ComponentFixture<PatientExamination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientExamination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientExamination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
