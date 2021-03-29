import { Component,Inject,Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Desk, Desklocation, DeskDates } from '../model/Desk';


@Injectable({
  providedIn: 'root'
})





export class GetService {
   getDatesAvailble() {


     return this.htpp.get<DeskDates[]>(this.baseurl + 'Desk/LikeProfile');

  }

  getDesks(user: string) {
    let params = new HttpParams();
    params = params.append('username', user);

    return this.htpp.get<Desk[]>(this.baseurl + 'Desk/GetMyMeetings', { params: params });

  }

  getAdminDesks() {


    return this.htpp.get<Desk[]>(this.baseurl + 'Desk/GetAllMeetingsAdmin');

  }


  getAllDesks() {
    let params = new HttpParams();

    return this.htpp.get<Desk[]>(this.baseurl + 'Desk/GetAllMeetings', {  });

  }




  private baseurl: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private htpp: HttpClient) {

    this.baseurl = environment.BASE_URL;
  }


  Remove(_desk: any) {
    this.htpp.post<boolean>(this.baseurl + 'Desk/Remove',_desk, this.httpOptions).subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );





  }


  getAgreemnt(username: string) {
    debugger
    let params = new HttpParams();
    params = params.append('username', username);
    return this.htpp.get<boolean>(this.baseurl + 'Desk/Agreement', { params: params });
  }


  getPosts(): Observable<Desklocation[]> {

    return this.htpp.get<Desklocation[]>(this.baseurl + 'Desk');
  }
      SetPosts(_desk: any) {
        this.htpp.post<boolean>(this.baseurl + 'Desk', _desk, this.httpOptions).subscribe(
       data => console.log('success', data),
       error => console.log('oops', error)
        );





  }
  SetAgeements(_desk: any) {
    this.htpp.post<boolean>(this.baseurl + 'Desk/PostAgreement', _desk, this.httpOptions).subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );





  }
}

