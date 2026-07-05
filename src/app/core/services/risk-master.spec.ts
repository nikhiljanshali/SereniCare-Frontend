import { TestBed } from '@angular/core/testing';

import '@core/services/risk-master.ts';

describe('RiskMaster', () => {
  let service: RiskMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
