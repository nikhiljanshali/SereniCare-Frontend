import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTpaDashboard } from './insurance-tpa-dashboard';

describe('InsuranceTpaDashboard', () => {
  let component: InsuranceTpaDashboard;
  let fixture: ComponentFixture<InsuranceTpaDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceTpaDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceTpaDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
