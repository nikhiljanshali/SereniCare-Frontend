import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorClinics } from './doctor-clinics';

describe('DoctorClinics', () => {
  let component: DoctorClinics;
  let fixture: ComponentFixture<DoctorClinics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorClinics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorClinics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
