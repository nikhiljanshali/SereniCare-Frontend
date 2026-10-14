import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceDetail } from './view-service-detail';

describe('ViewServiceDetail', () => {
  let component: ViewServiceDetail;
  let fixture: ComponentFixture<ViewServiceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewServiceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewServiceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
