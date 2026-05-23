import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroup } from './blood-group';

describe('BloodGroup', () => {
  let component: BloodGroup;
  let fixture: ComponentFixture<BloodGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
