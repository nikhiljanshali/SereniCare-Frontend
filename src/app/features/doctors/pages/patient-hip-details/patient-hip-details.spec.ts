import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHipDetails } from './patient-hip-details';

describe('PatientHipDetails', () => {
  let component: PatientHipDetails;
  let fixture: ComponentFixture<PatientHipDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientHipDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHipDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
