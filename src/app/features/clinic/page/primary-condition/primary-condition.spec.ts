import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryCondition } from './primary-condition';

describe('PrimaryCondition', () => {
  let component: PrimaryCondition;
  let fixture: ComponentFixture<PrimaryCondition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryCondition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryCondition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
