import { TestBed } from '@angular/core/testing';

import { InsuraceTpa } from './insurace-tpa';

describe('InsuraceTpa', () => {
  let service: InsuraceTpa;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuraceTpa);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
