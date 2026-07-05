import { TestBed } from '@angular/core/testing';

import { Sidebar } from '@core/services/sidebar';

describe('Sidebar', () => {
  let service: Sidebar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sidebar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
