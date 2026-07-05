import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLayout } from '@features/patient/patient-layout/patient-layout';

describe('PatientLayout', () => {
  let component: PatientLayout;
  let fixture: ComponentFixture<PatientLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
