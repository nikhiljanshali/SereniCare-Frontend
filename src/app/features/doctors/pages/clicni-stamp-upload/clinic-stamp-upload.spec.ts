import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClicniStampUpload } from './clicni-stamp-upload';

describe('ClicniStampUpload', () => {
  let component: ClicniStampUpload;
  let fixture: ComponentFixture<ClicniStampUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClicniStampUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClicniStampUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
