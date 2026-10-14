import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTPALayout } from './insurance-tpalayout';

describe('InsuranceTPALayout', () => {
  let component: InsuranceTPALayout;
  let fixture: ComponentFixture<InsuranceTPALayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceTPALayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceTPALayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
