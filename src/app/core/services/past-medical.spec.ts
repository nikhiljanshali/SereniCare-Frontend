import { TestBed } from '@angular/core/testing';

import { PastMedical } from './past-medical';

describe('PastMedical', () => {
  let service: PastMedical;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastMedical);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
