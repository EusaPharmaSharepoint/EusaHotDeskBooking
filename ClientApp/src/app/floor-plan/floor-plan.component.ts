import { Component, OnInit } from '@angular/core';
import { GetService} from  '../Services/Get.Service'
import { Injectable } from "@angular/core";
import { Desk, Desklocation, DeskDates } from '../model/Desk';
import { AlertsService } from '../alerts.service';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { User } from '../user';
import { HttpHeaders } from '@angular/common/http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faCookie, faBold } from '@fortawesome/free-solid-svg-icons';
import { GraphService } from '../graph.service';
import { HttpClient,  HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.css','../home/NewEusaCSS.css','../home/grid.scss']
})
export class FloorPlanComponent implements OnInit {

  private _jsonecc = 'assets/ecc.json';

  desksGround: Desklocation[];
  desksThird: Desklocation[];
  desksFrance: Desklocation[];
  days: number[] = [0];
  selectdays: Date[];
  ecc:string[];
  minDate = new Date();
  maxDate = new Date(Date.now() + 12096e5)
  bool: boolean = true;
  floorplan: Desklocation;
  floordates: DeskDates[];
  private datePipe: DatePipe
  visability: boolean;
  thanks: boolean;
 ;

  constructor(private userService: GetService, private httpclient: HttpClient, private graphService: GraphService,  private authService: AuthService, private modalService: NgbModal, private alertsService: AlertsService) {

    this.getJSON().subscribe(data => {this.ecc = data;}, error => console.log(error));

    this.userService.getDatesAvailble().subscribe(result => {
      this.floordates = result;

    });

    this.userService.getPosts().subscribe((desks: Desklocation[]) => {

      const result = this.ecc.includes(this.authService.email);
        if(!result)
        {
          this.desksGround = desks.filter(
            function (e) {
              return e.floor.includes('Ground') && e.eccDesk === false;
            }
          );



          this.desksThird = desks.filter(
            function (e) {
              return e.floor.includes('Third') && e.eccDesk === false;
            }
          );
          this.desksFrance = desks.filter(
            function (e) {
              return e.floor.includes('France') && e.eccDesk === false;
            }
          );
          console.log(this.desksFrance);

}
else
{
  this.desksGround = desks.filter(s => s.floor.includes('Ground'));
          this.desksThird = desks.filter(s => s.floor.includes('Third'));
          this.desksFrance = desks.filter(s => s.floor.includes('France'));
          console.log(this.desksFrance);
}
    });

  }



  public getJSON(): Observable<any> {
    console.log(this._jsonecc);
    return this.httpclient.get(this._jsonecc).pipe(map((response:string[]) => response));


  }




  scroll() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  clearform() {
    this.visability = false;
    this.selectdays = [];
  }
  open(content) {
    this.modalService.open(content)
  }

  submitbooking(floor: any) {


    this.visability = false;
    this.thanks = true;
    floor.isbooked = true;

    this.selectdays.forEach(
      d => {
        let desk: Desk = { id: 0, isarchived: false, bookby: this.authService.user, bookedto: d, bookedfrom: d, locationid: this.floorplan.id };

        try {
          this.userService.SetPosts(desk);
          this.sendmessage();
        }
        catch (error) {
          this.alertsService.add("There has been a problem please contact IT", "");
        }
      }
    )
    this.userService.getDatesAvailble().subscribe(result => {
      this.floordates = result;

    });




  }


  sendmessage() {

    const html = '<div style="max-width:550px; min-width:320px;  background-color: white; border: 1px solid #DDDDDD; margin-right: auto; margin-left: auto;" ><div style="margin-left:30px;margin-right:30px"><p>Hot Desk Booking</p> <p> <a href="#" style="text-decoration:none;font-family:Verdana, Geneva, sans-serif;font-weight: bold; color: #3D3D3D;font-size: 15px"></a></p><hr style="margin-top:10px;margin-bottom:65px;border:none;border-bottom:1px solid red"/><h1 style="font-family: Tahoma, Geneva, sans-serif; font-weight: normal; color: #2A2A2A; text-align: center; margin-bottom: 65px;font-size: 20px; letter-spacing: 6px;font-weight: normal; border: 2px solid black; padding: 15px;"></h1><h3 style = "font-family:Palatino Linotype, Book Antiqua, Palatino, serif;font-style:italic;font-weight:500">this.authService.user.displayName<span style="border-bottom: 1px solid red"> Has Booked </span>  this.selectdays.join('; ')</h3><p style="font-family:Palatino Linotype, Book Antiqua, Palatino, serif;font-size: 15px; margin-left: auto; margin-right: auto; text-align: justify;color: #666;line-height:1.5;margin-bottom:75px"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus vel metus eu urna lobortis condimentum vel aenim.Pellentesque malesuada sapien id pellentesque suscipit.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean porta tincidunt malesuada.Curabitur ac consectetur tellus.Etiam aliquet ante sed nibh lobortis maximus.In at egestas justo.</p> <table style="width:100%;"><th><td style="width:25%" > </td><td style="background-color:black;with:50%;text-align:center;padding:15px"> <a href="https://eusahotdeskbooking.azurewebsites.net/" style="margin-left: auto; margin-right: auto;text-decoration:none;color: white;text-align:center;font-family:Courier New, Courier, monospace;font-weight:600;letter-spacing:2px;background-color:black;padding:15px">Please Click here to book your desk</a></td><td style="width:25%"> </td> </th> </table><hr style = "margin-top:10px;margin-top:75px" /><p style="text-align:center;margin-bottom:15px"> <small style="text-align:center;font-family:Courier New, Courier, monospace;font-size:10px;color#666;"> CC BY - SA 4.0 <a href="#" style="color:#666" > Lógico Software </a> | Made with <span style="color:red">&hearts;</span> in Argentina < /small></p><p>& nbsp; </p> </div> </div>'

      const message: MicrosoftGraph.Message = {
        subject: "Hot-Desk Booking",
        importance: "low",
        body: {
          contentType: "html",
          content: html
        },
        toRecipients: [
          {
            emailAddress: {
              address: "carl.dacey@eusapharma.com"
            }
          }
        ],
        attachments: []
      };

      this.graphService.postMessage(message);
    }






  dateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {

       const containsFordFocus = this.floordates.some(floor => floor.name === this.floorplan.name && new Date(floor.dates).toDateString() === date.toDateString());
       return !containsFordFocus;
       // day !== 0 && day !== 6;
      //0 means sunday
      //6 means saturday
    }

  updatefloorplan(floor: any) {

console.log()

      this.floorplan = floor;
    this.selectdays = [];
      this.thanks = false;
    this.visability = true;




  }

  get user(): User {
    return this.authService.user;
  }

  updateCalcs(event: any) {
    this.days = [];
    for (var i = 0; i < 4; i++) {
      this.days.push(i);
    }


  }
  ngOnInit(): void {
    for (var i = 1; i < 6; i++) {
      this.days.push(i);
    }





  }

}
