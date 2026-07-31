import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPresentIllness } from './patient-present-illness';

describe('PatientPresentIllness', () => {
  let component: PatientPresentIllness;
  let fixture: ComponentFixture<PatientPresentIllness>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientPresentIllness]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPresentIllness);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
