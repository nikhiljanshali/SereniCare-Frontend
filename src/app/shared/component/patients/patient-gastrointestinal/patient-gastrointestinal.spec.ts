import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientGastrointestinal } from './patient-gastrointestinal';

describe('PatientGastrointestinal', () => {
  let component: PatientGastrointestinal;
  let fixture: ComponentFixture<PatientGastrointestinal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientGastrointestinal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientGastrointestinal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
