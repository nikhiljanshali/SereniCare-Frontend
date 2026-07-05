import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentBooking } from '@features/doctors/pages/edit-appointment-booking/edit-appointment-booking';

describe('EditAppointmentBooking', () => {
  let component: EditAppointmentBooking;
  let fixture: ComponentFixture<EditAppointmentBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAppointmentBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAppointmentBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
