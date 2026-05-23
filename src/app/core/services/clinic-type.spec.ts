import { TestBed } from '@angular/core/testing';

import { ClinicType } from './clinic-type';

describe('ClinicType', () => {
  let service: ClinicType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicType);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
