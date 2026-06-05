import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorEducation } from './edit-doctor-education';

describe('EditDoctorEducation', () => {
  let component: EditDoctorEducation;
  let fixture: ComponentFixture<EditDoctorEducation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDoctorEducation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDoctorEducation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
