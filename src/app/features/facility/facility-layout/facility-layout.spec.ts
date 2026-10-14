import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityLayout } from './facility-layout';

describe('FacilityLayout', () => {
  let component: FacilityLayout;
  let fixture: ComponentFixture<FacilityLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
