import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRegistration } from '@features/doctors/pages/doctor-registration/doctor-registration';

describe('DoctorRegistration', () => {
  let component: DoctorRegistration;
  let fixture: ComponentFixture<DoctorRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
