import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarPatientHeader } from './side-bar-patient-header';

describe('SideBarPatientHeader', () => {
  let component: SideBarPatientHeader;
  let fixture: ComponentFixture<SideBarPatientHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarPatientHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarPatientHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
