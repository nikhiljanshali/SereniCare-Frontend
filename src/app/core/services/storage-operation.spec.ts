import { TestBed } from '@angular/core/testing';

import { StorageOperation } from '@core/services/storage-operation';

describe('StorageOperation', () => {
  let service: StorageOperation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageOperation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
