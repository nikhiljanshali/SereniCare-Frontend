import { TestBed } from '@angular/core/testing';

import { Diseases } from './diseases';

describe('Diseases', () => {
  let service: Diseases;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Diseases);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
