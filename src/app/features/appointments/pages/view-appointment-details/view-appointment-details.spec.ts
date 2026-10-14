import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentDetails } from './view-appointment-details';

describe('ViewAppointmentDetails', () => {
  let component: ViewAppointmentDetails;
  let fixture: ComponentFixture<ViewAppointmentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAppointmentDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppointmentDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
