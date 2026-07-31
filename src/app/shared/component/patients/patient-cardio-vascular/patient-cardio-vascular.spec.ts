import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardioVascular } from './patient-cardio-vascular';

describe('PatientCardioVascular', () => {
  let component: PatientCardioVascular;
  let fixture: ComponentFixture<PatientCardioVascular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientCardioVascular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCardioVascular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
