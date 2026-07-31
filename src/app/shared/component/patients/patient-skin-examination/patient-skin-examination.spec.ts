import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSkinExamination } from './patient-skin-examination';

describe('PatientSkinExamination', () => {
  let component: PatientSkinExamination;
  let fixture: ComponentFixture<PatientSkinExamination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSkinExamination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSkinExamination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
