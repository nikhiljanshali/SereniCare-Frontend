import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseRegistration } from './nurse-registration';

describe('NurseRegistration', () => {
  let component: NurseRegistration;
  let fixture: ComponentFixture<NurseRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
