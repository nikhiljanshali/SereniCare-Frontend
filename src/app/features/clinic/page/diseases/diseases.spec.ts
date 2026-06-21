import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diseases } from './diseases';

describe('Diseases', () => {
  let component: Diseases;
  let fixture: ComponentFixture<Diseases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diseases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diseases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
