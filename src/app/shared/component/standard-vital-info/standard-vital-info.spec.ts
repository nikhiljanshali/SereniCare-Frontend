import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardVitalInfo } from './standard-vital-info';

describe('StandardVitalInfo', () => {
  let component: StandardVitalInfo;
  let fixture: ComponentFixture<StandardVitalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardVitalInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardVitalInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
