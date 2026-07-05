import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@shared/component/patients/family-history/family-history.ts';

describe('FamilyHistory', () => {
  let component: FamilyHistory;
  let fixture: ComponentFixture<FamilyHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
