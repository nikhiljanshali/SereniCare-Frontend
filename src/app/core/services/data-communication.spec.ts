import { TestBed } from '@angular/core/testing';

import { DataCommunication } from './data-communication';

describe('DataCommunication', () => {
  let service: DataCommunication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCommunication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
