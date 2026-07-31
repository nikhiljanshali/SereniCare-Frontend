import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPhycialExamiantionDetails } from './patient-phycial-examiantion-details';

describe('PatientPhycialExamiantionDetails', () => {
  let component: PatientPhycialExamiantionDetails;
  let fixture: ComponentFixture<PatientPhycialExamiantionDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientPhycialExamiantionDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPhycialExamiantionDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
