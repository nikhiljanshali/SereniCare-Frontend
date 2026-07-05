import { TestBed } from '@angular/core/testing';

import { PrescriptionServices } from '@core/services/prescription-services';

describe('PrescriptionServices', () => {
  let service: PrescriptionServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriptionServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
