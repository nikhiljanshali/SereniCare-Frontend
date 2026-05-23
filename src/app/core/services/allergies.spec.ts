import { TestBed } from '@angular/core/testing';

import { Allergies } from './allergies';

describe('Allergies', () => {
  let service: Allergies;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Allergies);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
