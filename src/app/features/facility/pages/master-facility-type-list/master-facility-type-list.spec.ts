import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFacilityTypeList } from './master-facility-type-list';

describe('MasterFacilityTypeList', () => {
  let component: MasterFacilityTypeList;
  let fixture: ComponentFixture<MasterFacilityTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterFacilityTypeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterFacilityTypeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
