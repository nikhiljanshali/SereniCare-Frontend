import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@shared/component/patients/patient-drug-reaction/patient-drug-reaction.ts';

describe('PatientDrugReaction', () => {
  let component: PatientDrugReaction;
  let fixture: ComponentFixture<PatientDrugReaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDrugReaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDrugReaction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
