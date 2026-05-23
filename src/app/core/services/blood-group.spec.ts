import { TestBed } from '@angular/core/testing';

import { BloodGroup } from './blood-group';

describe('BloodGroup', () => {
  let service: BloodGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodGroup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
