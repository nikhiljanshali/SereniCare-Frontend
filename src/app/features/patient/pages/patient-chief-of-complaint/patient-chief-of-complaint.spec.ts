import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChiefOfComplaint } from './patient-chief-of-complaint';

describe('PatientChiefOfComplaint', () => {
  let component: PatientChiefOfComplaint;
  let fixture: ComponentFixture<PatientChiefOfComplaint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientChiefOfComplaint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientChiefOfComplaint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
