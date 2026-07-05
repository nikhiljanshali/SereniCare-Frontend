import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@features/clinic/page/risk-master/risk-master.ts';

describe('RiskMaster', () => {
  let component: RiskMaster;
  let fixture: ComponentFixture<RiskMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
