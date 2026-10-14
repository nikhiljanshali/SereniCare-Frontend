import { TestBed } from '@angular/core/testing';

import { DepartmentType } from './department-type';

describe('DepartmentType', () => {
  let service: DepartmentType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentType);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
