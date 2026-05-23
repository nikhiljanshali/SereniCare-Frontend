import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicLayout } from './clinic-layout';

describe('ClinicLayout', () => {
  let component: ClinicLayout;
  let fixture: ComponentFixture<ClinicLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
