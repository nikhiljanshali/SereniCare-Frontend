import { TestBed } from '@angular/core/testing';

import { MedicalServices } from './medical-services';

describe('MedicalServices', () => {
  let service: MedicalServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
