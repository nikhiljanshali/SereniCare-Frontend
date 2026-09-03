import { TestBed } from '@angular/core/testing';

import { ClinicStampUpload } from './clinic-stamp-upload';

describe('ClinicStampUpload', () => {
  let service: ClinicStampUpload;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicStampUpload);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
