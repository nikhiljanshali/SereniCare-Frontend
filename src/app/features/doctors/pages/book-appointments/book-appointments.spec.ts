import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointments } from './book-appointments';

describe('BookAppointments', () => {
  let component: BookAppointments;
  let fixture: ComponentFixture<BookAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAppointments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAppointments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
