import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalServicesLayout } from './medical-services-layout';

describe('MedicalServicesLayout', () => {
  let component: MedicalServicesLayout;
  let fixture: ComponentFixture<MedicalServicesLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalServicesLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalServicesLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
