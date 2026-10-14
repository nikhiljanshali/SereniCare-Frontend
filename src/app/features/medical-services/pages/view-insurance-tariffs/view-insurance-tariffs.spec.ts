import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsuranceTariffs } from './view-insurance-tariffs';

describe('ViewInsuranceTariffs', () => {
  let component: ViewInsuranceTariffs;
  let fixture: ComponentFixture<ViewInsuranceTariffs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewInsuranceTariffs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInsuranceTariffs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
