import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionLayout } from './prescription-layout';

describe('PrescriptionLayout', () => {
  let component: PrescriptionLayout;
  let fixture: ComponentFixture<PrescriptionLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
