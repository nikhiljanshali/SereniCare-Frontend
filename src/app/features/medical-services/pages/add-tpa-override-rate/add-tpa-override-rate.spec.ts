import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTpaOverrideRate } from './add-tpa-override-rate';

describe('AddTpaOverrideRate', () => {
  let component: AddTpaOverrideRate;
  let fixture: ComponentFixture<AddTpaOverrideRate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTpaOverrideRate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTpaOverrideRate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
