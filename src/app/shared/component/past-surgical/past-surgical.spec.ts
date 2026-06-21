import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSurgical } from './past-surgical';

describe('PastSurgical', () => {
  let component: PastSurgical;
  let fixture: ComponentFixture<PastSurgical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastSurgical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastSurgical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
