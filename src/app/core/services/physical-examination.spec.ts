import { TestBed } from '@angular/core/testing';

import { PhysicalExamination } from './physical-examination';

describe('PhysicalExamination', () => {
  let service: PhysicalExamination;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalExamination);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
