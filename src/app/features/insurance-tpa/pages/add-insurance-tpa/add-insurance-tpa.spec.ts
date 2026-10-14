import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsuranceTPA } from './add-insurance-tpa';

describe('AddInsuranceTPA', () => {
  let component: AddInsuranceTPA;
  let fixture: ComponentFixture<AddInsuranceTPA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInsuranceTPA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInsuranceTPA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
