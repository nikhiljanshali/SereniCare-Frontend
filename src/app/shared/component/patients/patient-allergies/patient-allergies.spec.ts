import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@shared/component/patients/patient-allergies/patient-allergies.ts';

describe('PatientAllergies', () => {
  let component: PatientAllergies;
  let fixture: ComponentFixture<PatientAllergies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAllergies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAllergies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
