import { TestBed } from '@angular/core/testing';

import { AppointmentBook } from './appointment-book';

describe('AppointmentBook', () => {
  let service: AppointmentBook;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentBook);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
