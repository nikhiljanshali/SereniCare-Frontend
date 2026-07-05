import { TestBed } from '@angular/core/testing';

import '@core/services/patient-allergies.ts';

describe('PatientAllergies', () => {
  let service: PatientAllergies;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientAllergies);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
