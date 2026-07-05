import { TestBed } from '@angular/core/testing';

import '@core/services/family-history.ts';

describe('FamilyHistory', () => {
  let service: FamilyHistory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyHistory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
