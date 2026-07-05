import { TestBed } from '@angular/core/testing';

import '@core/services/patient-drug-reaction.ts';

describe('PatientDrugReaction', () => {
  let service: PatientDrugReaction;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientDrugReaction);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
