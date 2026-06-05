import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointment } from './doctor-appointment';

describe('DoctorAppointment', () => {
  let component: DoctorAppointment;
  let fixture: ComponentFixture<DoctorAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAppointment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
