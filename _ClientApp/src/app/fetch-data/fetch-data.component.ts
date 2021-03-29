import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: Desk[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Desk[]>(baseUrl + 'Desk').subscribe(result => {

      console.log(result);
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}



interface Desk {
  Id: Number;
  Location: string;
  Bookedto: Date;
  Bookedfrom: Date;
  Isarchived: Boolean;
}

