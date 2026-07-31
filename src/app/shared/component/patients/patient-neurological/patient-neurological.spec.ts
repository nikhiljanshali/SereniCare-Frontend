import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNeurological } from './patient-neurological';

describe('PatientNeurological', () => {
  let component: PatientNeurological;
  let fixture: ComponentFixture<PatientNeurological>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientNeurological]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientNeurological);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
