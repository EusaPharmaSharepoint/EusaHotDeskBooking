// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { MsalModule } from '@azure/msal-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';
import { OAuthSettings } from '../oauth';
import { CalendarComponent } from './calendar/calendar.component';
import { FloorPlanComponent } from './floor-plan/floor-plan.component';
import { HandsanitizernComponent } from './handsanitizern/handsanitizern.component';
import { EmailmyfriendsComponent } from './emailmyfriends/emailmyfriends.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates'; // module import
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { BookmeetingroomsComponent } from './bookmeetingrooms/bookmeetingrooms.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AgreementComponent } from './agreement/agreement.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { OneModalComponent } from './ModalPopUp/one-model-component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { FranceBookingComponent } from './france-booking/france-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AlertsComponent,
    CalendarComponent,
    FloorPlanComponent,
    HandsanitizernComponent,
    EmailmyfriendsComponent,
    BookmeetingroomsComponent,
    AgreementComponent,
    OneModalComponent,
    AllBookingsComponent,
    FranceBookingComponent

  ],
  // <imports>
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    NgxSmartModalModule.forRoot(),
    FontAwesomeModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMultipleDatesModule, // import to Angular
    MsalModule.forRoot({
      auth: {
        clientId: OAuthSettings.appId
      }
    }),
    BrowserAnimationsModule
  ],
  exports: [
    MatDatepickerModule,
    MatButtonModule
  ],
  // </imports>
  providers: [MatFormFieldModule, MatDatepickerModule,NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Register the FontAwesome icons used by the app
    library.addIcons(faExternalLinkAlt, faUserCircle);
  }
 }
