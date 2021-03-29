import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailmyfriendsComponent } from './emailmyfriends.component';

describe('EmailmyfriendsComponent', () => {
  let component: EmailmyfriendsComponent;
  let fixture: ComponentFixture<EmailmyfriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailmyfriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailmyfriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
