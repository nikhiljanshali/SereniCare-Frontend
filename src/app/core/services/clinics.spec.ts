import { TestBed } from '@angular/core/testing';

import { Clinics } from './clinics';

describe('Clinics', () => {
  let service: Clinics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clinics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
