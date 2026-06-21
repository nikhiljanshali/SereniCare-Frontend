import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalDetails } from './vital-details';

describe('VitalDetails', () => {
  let component: VitalDetails;
  let fixture: ComponentFixture<VitalDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
