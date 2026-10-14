import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServicePackageDetail } from './view-service-package-detail';

describe('ViewServicePackageDetail', () => {
  let component: ViewServicePackageDetail;
  let fixture: ComponentFixture<ViewServicePackageDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewServicePackageDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewServicePackageDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
