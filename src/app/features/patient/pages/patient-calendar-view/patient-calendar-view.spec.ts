import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCalendarView } from './patient-calendar-view';

describe('PatientCalendarView', () => {
  let component: PatientCalendarView;
  let fixture: ComponentFixture<PatientCalendarView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientCalendarView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCalendarView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
