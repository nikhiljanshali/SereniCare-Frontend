import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WingsNBeds } from './wings-nbeds';

describe('WingsNBeds', () => {
  let component: WingsNBeds;
  let fixture: ComponentFixture<WingsNBeds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WingsNBeds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WingsNBeds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
