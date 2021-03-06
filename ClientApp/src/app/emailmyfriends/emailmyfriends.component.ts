import { Component, OnInit } from '@angular/core';


import { GraphService } from '../graph.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { GetService } from '../Services/Get.Service'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-emailmyfriends',
  templateUrl: './emailmyfriends.component.html',
  styleUrls: ['./emailmyfriends.component.css','./styles.scss']
})
export class EmailmyfriendsComponent implements OnInit {

  items = [
  ];

  date = [];
  public desks: any[];

  selectedEmails: string[];
  selectedDates: string;
  Message: string;



  constructor(private graphService: GraphService, private getService: GetService, private authService: AuthService, private router: Router) {

    this.getService.getDesks(this.authService.username).subscribe(d => {
      this.desks = d;

    });
  }




  sendmessage()
  {
    let emails = this.selectedEmails.map(mail =>
    {

      const html = '<div style="max-width:550px; min-width:320px;  background-color: white; border: 1px solid #DDDDDD; margin-right: auto; margin-left: auto;">'+
        +'<div style="margin-left:30px;margin-right:30px">'+
        +'<p>& nbsp; </p> <p>'+
        +'<a href = "#" style = "text-decoration:none;font-family:Verdana, Geneva, sans-serif;font-weight: bold; color: #3D3D3D;font-size: 15px" > </a > </p>'+
        +'<hr style = "margin-top:10px;margin-bottom:65px;border:none;border-bottom:1px solid red" / > <h1 style="font-family: Tahoma, Geneva, sans-serif; font-weight: normal; color: #2A2A2A; text-align: center; margin-bottom: 65px;font-size: 20px; letter-spacing: 6px;font-weight: normal; border: 2px solid black; padding: 15px;" >' +
        +'</h1><h3 style = "font-family:Palatino Linotype, Book Antiqua, Palatino, serif;font-style:italic;font-weight:500">Your opinion is <span style="border-bottom: 1px solid red"> very important </span > to us: </h3><p style="font-family:Palatino Linotype, Book Antiqua, Palatino, serif;font-size: 15px; margin-left: auto; margin-right: auto; text-align: justify;color: #666;line-height:1.5;margin-bottom:75px">'+
        +'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus vel metus eu urna lobortis condimentum vel aenim.Pellentesque malesuada sapien id pellentesque suscipit.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean porta tincidunt malesuada.Curabitur ac consectetur tellus.Etiam aliquet ante sed nibh lobortis maximus.In at egestas justo.< /p > <table style="width:100%;" > <th><td style="width:25%" > </td > <td style="background-color:black;with:50%;text-align:center;padding:15px" > <a href="https:/ / eusahotdeskbooking.azurewebsites.net / " style = "margin - left: auto; margin - right: auto; text - decoration: none; color: white; text - align: center; font - family: Courier New, Courier, monospace; font - weight: 600; letter - spacing: 2px; background - color: black; padding: 15px" > Please Click here to book your desk < /a></td > <td style="width: 25 % " > </td> </th > </table><hr style = "margin - top: 10px; margin - top: 75px" / > <p style="text - align: center; margin - bottom: 15px" > <small style="text - align: center; font - family: Courier New, Courier, monospace; font - size: 10px; color#666; " > CC BY - SA 4.0 < a href = "#" style = "color:#666" > L??gico Software < /a> | Made with <span style="color: red">&hearts;</span > in Argentina < /small></p > <p>& nbsp; </p> </div > </div>'

      const message: MicrosoftGraph.Message = {
        subject: "Hot-Desk Booking",
        importance:"low",
        body: {
          contentType: "html",
          content: html + "Hi i have booked the following " + this.selectedDates + "<br/> " + this.Message
        },
        toRecipients: [
          {
            emailAddress: {
              address: mail
            }
          }
        ],
        attachments: []
      };

  this.graphService.postMessage(message);
    }


    );
    this.router.navigateByUrl('/Home');

  }



  ngOnInit(): void {

    //this.

      this.graphService.getContacts().then(result =>  this.items = result.map((currElement, index)  => { return {id:index,name:currElement.mail}}));

  }

}
