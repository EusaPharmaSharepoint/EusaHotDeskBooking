// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphServiceSnippet>
import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';

import { AuthService } from './auth.service';
import { Event } from './event';
import { AlertsService } from './alerts.service';
import { ResourceRoom } from './model/Desk';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphClient: Client;
  constructor(
    private authService: AuthService,
    private alertsService: AlertsService) {






    // Initialize the Graph client
    this.graphClient = Client.init({
      authProvider: async (done) => {
        // Get the token from the auth service
        let token = await this.authService.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token) {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });
  }

  async  getResourceroom() {
    
    let result = await this.graphClient.api('/me/findRooms').version('beta')
      .get();    
      return result.value;
  }

  async bookMeetingRoom() {

   
    const event = {
      subject: "Let's go for lunch",
      body: {
        contentType: "HTML",
        content: "Does noon work for you?"
      },
      start: {
        dateTime: "2020-09-03T12:00:00",
        timeZone: "GMT Standard Time"
      },
      end: {
        dateTime: "2020-09-03T14:00:00",
        timeZone: "GMT Standard Time"
      },
      location: {
        displayName: "UK Apollo Room"
      },
      attendees: [
        {
          emailAddress: {
            address: "carl.dacey@eusapharma.com"
          },
          type: "required"
        },
        {
          emailAddress: {
            address: "apollo.room@eusapharma.com"
          },
          type: "required"
        },
        
        {
          emailAddress: {
            address: "carlgpdacey@hotmail.co.uk"
          },
          type: "required"
        },
        {
          emailAddress: {
            address: "carldacey@ipexialtd.com"
          },
          type: "required"
        }

      ],
      allowNewTimeProposals: true
    };

    let res = await  this.graphClient.api('/me/events')
      .post(event);
    return res;
  }



  async getEvents(): Promise<Event[]> {
    try {
      let result = await this.graphClient
        .api('/me/events')
        .select('subject,organizer,start,end')
        .orderby('createdDateTime DESC')
        .get();

      return result.value;
    } catch (error) {
      this.alertsService.add('Could not get events', JSON.stringify(error, null, 2));
    }
  }



  async postMessage(message:any)
  {
    try
    {
     this.graphClient.api('/me/sendMail').post({message});
    }
    catch(error)
    {
      this.alertsService.add('Could not get events', JSON.stringify(error, null, 2));
    }
  }
  async getContacts(): Promise<any[]>
   {

    let result = await this.graphClient.api('/users').select('mail').top(999)
    .get();
    return result.value;

}


}

// </graphServiceSnippet>
