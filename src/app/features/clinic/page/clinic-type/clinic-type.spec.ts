import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicType } from './clinic-type';

describe('ClinicType', () => {
  let component: ClinicType;
  let fixture: ComponentFixture<ClinicType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
