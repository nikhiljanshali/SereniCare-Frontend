import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentList } from './patient-appointment-list';

describe('PatientAppointmentList', () => {
  let component: PatientAppointmentList;
  let fixture: ComponentFixture<PatientAppointmentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAppointmentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAppointmentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
