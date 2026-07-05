import { TestBed } from '@angular/core/testing';

import { PrimaryCondition } from '@core/services/primary-condition';

describe('PrimaryCondition', () => {
  let service: PrimaryCondition;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimaryCondition);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
