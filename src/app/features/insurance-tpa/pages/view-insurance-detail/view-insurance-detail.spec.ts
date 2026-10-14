import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsuranceDetail } from './view-insurance-detail';

describe('ViewInsuranceDetail', () => {
  let component: ViewInsuranceDetail;
  let fixture: ComponentFixture<ViewInsuranceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewInsuranceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInsuranceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
