import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalServiceDashboard } from './medical-service-dashboard';

describe('MedicalServiceDashboard', () => {
  let component: MedicalServiceDashboard;
  let fixture: ComponentFixture<MedicalServiceDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalServiceDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalServiceDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
