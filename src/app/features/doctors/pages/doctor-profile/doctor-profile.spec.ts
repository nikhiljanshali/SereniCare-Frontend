import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfile } from '@features/doctors/pages/doctor-profile/doctor-profile';

describe('DoctorProfile', () => {
  let component: DoctorProfile;
  let fixture: ComponentFixture<DoctorProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
