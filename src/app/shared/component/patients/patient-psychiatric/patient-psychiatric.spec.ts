import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPsychiatric } from './patient-psychiatric';

describe('PatientPsychiatric', () => {
  let component: PatientPsychiatric;
  let fixture: ComponentFixture<PatientPsychiatric>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientPsychiatric]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPsychiatric);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
