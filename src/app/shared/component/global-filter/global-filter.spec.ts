import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFilter } from '@shared/component/global-filter/global-filter';

describe('GlobalFilter', () => {
  let component: GlobalFilter;
  let fixture: ComponentFixture<GlobalFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
