// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FloorPlanComponent } from './floor-plan/floor-plan.component';
import { HandsanitizernComponent } from './handsanitizern/handsanitizern.component';
import { EmailmyfriendsComponent } from './emailmyfriends/emailmyfriends.component';
import { BookmeetingroomsComponent } from './bookmeetingrooms/bookmeetingrooms.component';
import { AgreementComponent } from './agreement/agreement.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { FranceBookingComponent } from './france-booking/france-booking.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'floorpath', component: FloorPlanComponent },
  { path: 'handsanitizer', component: HandsanitizernComponent },
  { path: 'EmailmyfriendsComponent', component: EmailmyfriendsComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Booking', component: BookmeetingroomsComponent },
  { path: 'Agreement', component: AgreementComponent },
  { path: 'AllBooking', component: AllBookingsComponent },
  { path: 'France', component: FranceBookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
