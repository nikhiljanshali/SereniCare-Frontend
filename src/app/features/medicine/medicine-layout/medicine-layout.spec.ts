import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineLayout } from './medicine-layout';

describe('MedicineLayout', () => {
  let component: MedicineLayout;
  let fixture: ComponentFixture<MedicineLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
