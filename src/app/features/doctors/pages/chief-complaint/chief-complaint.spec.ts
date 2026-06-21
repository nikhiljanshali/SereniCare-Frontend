import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefComplaint } from './chief-complaint';

describe('ChiefComplaint', () => {
  let component: ChiefComplaint;
  let fixture: ComponentFixture<ChiefComplaint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiefComplaint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiefComplaint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
