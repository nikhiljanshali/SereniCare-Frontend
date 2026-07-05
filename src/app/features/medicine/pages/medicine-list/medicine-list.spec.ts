import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineList } from '@features/medicine/pages/medicine-list/medicine-list';

describe('MedicineList', () => {
  let component: MedicineList;
  let fixture: ComponentFixture<MedicineList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
