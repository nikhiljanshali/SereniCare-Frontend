import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticaionGuard } from './authenticaion-guard';

describe('authenticaionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticaionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
