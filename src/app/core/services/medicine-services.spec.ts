import { TestBed } from '@angular/core/testing';

import { MedicineServices } from './medicine-services';

describe('MedicineServices', () => {
  let service: MedicineServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
