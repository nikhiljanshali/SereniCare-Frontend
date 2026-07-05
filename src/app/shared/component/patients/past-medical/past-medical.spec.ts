import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@shared/component/patients/past-medical/past-medical.ts';

describe('PastMedical', () => {
  let component: PastMedical;
  let fixture: ComponentFixture<PastMedical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastMedical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastMedical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
