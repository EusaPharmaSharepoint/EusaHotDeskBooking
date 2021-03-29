import { Component, OnInit } from '@angular/core';
import { GraphService } from '../graph.service';
import { GetService } from '../Services/Get.Service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-bookmeetingrooms',
  templateUrl: './bookmeetingrooms.component.html',
  styleUrls: ['./bookmeetingrooms.component.css']
})
export class BookmeetingroomsComponent implements OnInit {
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

  items = [
  ];


  selectedEmails: string[];
  selectedDates: string[];
  Message: string;


  constructor(private graphService: GraphService, private getService: GetService, private router: Router) { }

  ngOnInit(): void {

    this.graphService.getContacts().then(result => this.items = result.map((currElement, index) => { return { id: index, name: currElement.mail } }));

  }

}
