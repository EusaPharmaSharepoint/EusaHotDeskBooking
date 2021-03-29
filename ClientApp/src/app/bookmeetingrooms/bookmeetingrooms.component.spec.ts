import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmeetingroomsComponent } from './bookmeetingrooms.component';

describe('BookmeetingroomsComponent', () => {
  let component: BookmeetingroomsComponent;
  let fixture: ComponentFixture<BookmeetingroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmeetingroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmeetingroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
