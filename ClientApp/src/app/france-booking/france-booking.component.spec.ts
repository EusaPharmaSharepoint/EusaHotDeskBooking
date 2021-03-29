import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranceBookingComponent } from './france-booking.component';

describe('FranceBookingComponent', () => {
  let component: FranceBookingComponent;
  let fixture: ComponentFixture<FranceBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranceBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranceBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
