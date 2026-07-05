import { TestBed } from '@angular/core/testing';

import { Patients } from '@core/services/patients';

describe('Patients', () => {
  let service: Patients;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Patients);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
