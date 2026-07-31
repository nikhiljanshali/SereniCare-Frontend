import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailHeader } from './patient-detail-header';

describe('PatientDetailHeader', () => {
  let component: PatientDetailHeader;
  let fixture: ComponentFixture<PatientDetailHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDetailHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDetailHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
