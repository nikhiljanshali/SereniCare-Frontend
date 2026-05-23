import { TestBed } from '@angular/core/testing';

import { MeshTable } from './mesh-table';

describe('MeshTable', () => {
  let service: MeshTable;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeshTable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
