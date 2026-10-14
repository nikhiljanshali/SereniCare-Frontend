import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalServiceMaster } from './medical-service-master';

describe('MedicalServiceMaster', () => {
  let component: MedicalServiceMaster;
  let fixture: ComponentFixture<MedicalServiceMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalServiceMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalServiceMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
