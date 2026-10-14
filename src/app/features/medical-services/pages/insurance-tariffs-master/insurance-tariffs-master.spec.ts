import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTariffsMaster } from './insurance-tariffs-master';

describe('InsuranceTariffsMaster', () => {
  let component: InsuranceTariffsMaster;
  let fixture: ComponentFixture<InsuranceTariffsMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceTariffsMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceTariffsMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
