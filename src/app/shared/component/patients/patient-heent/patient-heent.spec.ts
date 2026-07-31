import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHeent } from './patient-heent';

describe('PatientHeent', () => {
  let component: PatientHeent;
  let fixture: ComponentFixture<PatientHeent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientHeent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHeent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
