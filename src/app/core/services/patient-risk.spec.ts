import { TestBed } from '@angular/core/testing';

import '@core/services/patient-risk.ts';

describe('PatientRisk', () => {
  let service: PatientRisk;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientRisk);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
