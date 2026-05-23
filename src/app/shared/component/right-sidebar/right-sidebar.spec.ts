import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RighSidebar } from './righ-sidebar';

describe('RighSidebar', () => {
  let component: RighSidebar;
  let fixture: ComponentFixture<RighSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RighSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RighSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
