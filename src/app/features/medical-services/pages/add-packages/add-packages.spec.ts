import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackages } from './add-packages';

describe('AddPackages', () => {
  let component: AddPackages;
  let fixture: ComponentFixture<AddPackages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPackages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPackages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
