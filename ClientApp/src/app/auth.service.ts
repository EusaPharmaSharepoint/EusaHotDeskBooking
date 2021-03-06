// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';

import { AlertsService } from './alerts.service';
import { OAuthSettings } from '../oauth';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public authenticated: boolean;
  public user: User;
  public username: string;
  public email: string;

  // <constructorSnippet>
  constructor(
    private msalService: MsalService,
    private alertsService: AlertsService) {

    this.authenticated = this.msalService.getAccount() != null;
    this.getUser().then((user) => {this.user = user});
  }
  // </constructorSnippet>

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    let result = await this.msalService.loginPopup(OAuthSettings)
      .catch((reason) => {
        this.alertsService.add('Login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
      this.user = await this.getUser();
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings)
      .catch((reason) => {
        this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      return result.accessToken;
    }
    return null;
  }

  // <getUserSnippet>
  private async getUser(): Promise<User> {
    if (!this.authenticated) return null;

    let graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async(done) => {
        let token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token)
        {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    let graphUser = await graphClient.api('/me').get();

    let user = new User();
    user.displayName = graphUser.displayName;
    this.username = user.displayName;
    this.email = graphUser.mail;
    console.log(this.username);
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;

    return user;
  }
  // </getUserSnippet>
}
