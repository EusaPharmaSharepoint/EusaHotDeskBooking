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
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {
  public events: Event[];
  public desks: any[];

  constructor( private graphService: GraphService,
    private alertsService: AlertsService, private getService: GetService, private authService: AuthService) {



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

  ngOnInit(): void {
    this.getService.getAdminDesks().subscribe(d => {
      this.desks = d;
      console.log(this.desks);
    });

  }

}
