import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMedicine } from './import-medicine';

describe('ImportMedicine', () => {
  let component: ImportMedicine;
  let fixture: ComponentFixture<ImportMedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportMedicine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportMedicine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
