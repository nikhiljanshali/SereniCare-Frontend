import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMusculoskeletalExamination } from './patient-musculoskeletal-examination';

describe('PatientMusculoskeletalExamination', () => {
  let component: PatientMusculoskeletalExamination;
  let fixture: ComponentFixture<PatientMusculoskeletalExamination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMusculoskeletalExamination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMusculoskeletalExamination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
