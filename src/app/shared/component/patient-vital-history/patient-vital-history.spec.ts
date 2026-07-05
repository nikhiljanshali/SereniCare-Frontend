import { PatientVitalHistory } from './patient-vital-history';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('PatientVitalHistory', () => {
  let component: PatientVitalHistory;
  let fixture: ComponentFixture<PatientVitalHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientVitalHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientVitalHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
