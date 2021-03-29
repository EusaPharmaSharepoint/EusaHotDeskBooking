import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  providedIn:"root"
})

export class PostService
{

constructor(private httpclient: HttpClient) {}
post(data: any) : Observable<any>
{
  return new Observable((subscriber) => {
    this.httpclient.post('http://localhost:8080/',{
        body:data
    }).subscribe(data => {
        subscriber.next(true);
    }, () => subscriber.error());
});
}
}
