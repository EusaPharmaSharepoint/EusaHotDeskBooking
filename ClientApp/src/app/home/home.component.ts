// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../user';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { GetService } from '../Services/Get.Service';
import { Agreement } from '../model/Desk';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./NewEusaCSS.css','./grid.scss']
})
export class HomeComponent implements OnInit {
  // Is a user logged in?
  get authenticated(): boolean {
    return this.authService.authenticated;
  }
  // The user
  get user(): User {
    return this.authService.user;
  }


  constructor(private authService: AuthService,private userService: GetService,public ngxSmartModalService: NgxSmartModalService) { }


  submit() {

    let desk: Agreement = { Id: 0, AcceptedDate: new Date(), UserName: this.authService.username };

    try {
      this.userService.SetAgeements(desk);
      this.ngxSmartModalService.getModal('popupOne').close();
    }
    catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {

   console.log(this.user.displayName);
  }
  ngAfterViewInit() {
    if (this.authenticated) {
      this.userService.getAgreemnt(this.authService.username).subscribe(
        data => {
          if (!data) { this.ngxSmartModalService.getModal('popupOne').open(); }
        },
        error => console.log('oops', error)
      );
    }

  }
  // <signInSnippet>
  async signIn(): Promise<void> {
    await this.authService.signIn();
    if(this.authenticated)
    {
      this.userService.getAgreemnt(this.authService.username).subscribe(
        data => {
          if (!data) { this.ngxSmartModalService.getModal('popupOne').open(); }
        },
        error => console.log('oops', error)
      );
    }

  }
  // </signInSnippet>
}
