import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegistration } from './supplier-registration';

describe('SupplierRegistration', () => {
  let component: SupplierRegistration;
  let fixture: ComponentFixture<SupplierRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
