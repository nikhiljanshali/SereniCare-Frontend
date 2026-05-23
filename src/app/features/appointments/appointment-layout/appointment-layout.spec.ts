import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentLayout } from './appointment-layout';

describe('AppointmentLayout', () => {
  let component: AppointmentLayout;
  let fixture: ComponentFixture<AppointmentLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
