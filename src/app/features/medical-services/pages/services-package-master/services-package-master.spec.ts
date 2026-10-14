import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesPackageMaster } from './services-package-master';

describe('ServicesPackageMaster', () => {
  let component: ServicesPackageMaster;
  let fixture: ComponentFixture<ServicesPackageMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesPackageMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesPackageMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
