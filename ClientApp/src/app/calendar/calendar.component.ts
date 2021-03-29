// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { GraphService } from '../graph.service';
import { Event, DateTimeTimeZone } from '../event';
import { AlertsService } from '../alerts.service';
import { AuthService } from '../auth.service';
import { GetService } from '../Services/Get.Service'
import { Client } from '@microsoft/microsoft-graph-client';
import { User } from '../user';
import { Desk } from '../model/Desk';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public events: Event[];
  public desks: any[];


  constructor(
    private graphService: GraphService,
    private alertsService: AlertsService, private getService: GetService, private authService: AuthService) { }
  
  
  async ngOnInit() {

    //this.graphService.getResourceroom().then(result => { console.log(result); });
    //this.graphService.bookMeetingRoom().then(result => { console.log(result); });

    this.getService.getDesks(this.authService.username).subscribe(d => {
      this.desks = d;

    });

    this.graphService.getEvents()
      .then((events) => {
        this.events = events;
      });
    

    }

  remove(desk: any) {

    this.getService.Remove(desk);
    this.desks = [];
    this.getService.getDesks(this.authService.username).subscribe(d => {
      this.desks = d;

    });
  }

  formatDateTimeTimeZone(dateTime: DateTimeTimeZone): string {
    try
    {

      return moment(dateTime).format();
    }
    catch(error) {
      this.alertsService.add('DateTimeTimeZone conversion error', JSON.stringify(error));
    }
  }
 
}
