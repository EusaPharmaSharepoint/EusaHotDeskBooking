import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsanitizernComponent } from './handsanitizern.component';

describe('HandsanitizernComponent', () => {
  let component: HandsanitizernComponent;
  let fixture: ComponentFixture<HandsanitizernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandsanitizernComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandsanitizernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
