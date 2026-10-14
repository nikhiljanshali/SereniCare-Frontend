import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFacilityType } from './master-facility-type';

describe('MasterFacilityType', () => {
  let component: MasterFacilityType;
  let fixture: ComponentFixture<MasterFacilityType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterFacilityType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterFacilityType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
