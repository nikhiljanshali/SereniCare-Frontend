import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgetpassword } from '@features/auth/auth/page/forgetpassword/forgetpassword';

describe('Forgetpassword', () => {
  let component: Forgetpassword;
  let fixture: ComponentFixture<Forgetpassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forgetpassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forgetpassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
