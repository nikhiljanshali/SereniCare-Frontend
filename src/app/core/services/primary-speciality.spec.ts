import { TestBed } from '@angular/core/testing';

import { PrimarySpeciality } from './primary-speciality';

describe('PrimarySpeciality', () => {
  let service: PrimarySpeciality;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimarySpeciality);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
