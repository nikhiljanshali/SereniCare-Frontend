import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentBook } from './patient-appointment-book';

describe('PatientAppointmentBook', () => {
  let component: PatientAppointmentBook;
  let fixture: ComponentFixture<PatientAppointmentBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAppointmentBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAppointmentBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
