import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimarySpeciality } from './primary-speciality';

describe('PrimarySpeciality', () => {
  let component: PrimarySpeciality;
  let fixture: ComponentFixture<PrimarySpeciality>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimarySpeciality]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimarySpeciality);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
