import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class GetService {

private base:string;

  constructor(private htpp: HttpClient, @Injectable('BASE_URL') baseURL:string) {
    this.base = baseURL;

  }


  getPosts(): Observable<Desk[]> {
    return this.htpp.get<Desk[]>(this.base);
  }
}

interface Desk {
  Id: Number;
  Location: string;
  Bookedto: Date;
  Bookedfrom: Date;
  Isarchived: Boolean;
}
