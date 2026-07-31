import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientGenitourinary } from './patient-genitourinary';

describe('PatientGenitourinary', () => {
  let component: PatientGenitourinary;
  let fixture: ComponentFixture<PatientGenitourinary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientGenitourinary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientGenitourinary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
