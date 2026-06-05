import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorView } from './admin-doctor-view';

describe('AdminDoctorView', () => {
  let component: AdminDoctorView;
  let fixture: ComponentFixture<AdminDoctorView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDoctorView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDoctorView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
