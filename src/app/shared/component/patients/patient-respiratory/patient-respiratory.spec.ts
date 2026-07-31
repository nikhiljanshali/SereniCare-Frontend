import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRespiratory } from './patient-respiratory';

describe('PatientRespiratory', () => {
  let component: PatientRespiratory;
  let fixture: ComponentFixture<PatientRespiratory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRespiratory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRespiratory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
