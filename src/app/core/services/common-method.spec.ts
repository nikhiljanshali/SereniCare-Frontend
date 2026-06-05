import { TestBed } from '@angular/core/testing';

import { CommonMethod } from './common-method';

describe('CommonMethod', () => {
  let service: CommonMethod;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonMethod);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
