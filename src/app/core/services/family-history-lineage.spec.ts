import { TestBed } from '@angular/core/testing';

import '@core/services/family-history-lineage.ts';

describe('FamilyHistoryLineage', () => {
  let service: FamilyHistoryLineage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyHistoryLineage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
