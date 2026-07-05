import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@shared/component/patients/family-history-lineage/family-history-lineage.ts';

describe('FamilyHistoryLineage', () => {
  let component: FamilyHistoryLineage;
  let fixture: ComponentFixture<FamilyHistoryLineage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyHistoryLineage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyHistoryLineage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
