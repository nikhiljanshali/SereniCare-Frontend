import { TestBed } from '@angular/core/testing';

import { ApiSharedDataService } from './api-shared-data-service';

describe('ApiSharedDataService', () => {
  let service: ApiSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
