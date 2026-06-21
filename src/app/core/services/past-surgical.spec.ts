import { TestBed } from '@angular/core/testing';

import { PastSurgical } from './past-surgical';

describe('PastSurgical', () => {
  let service: PastSurgical;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastSurgical);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
