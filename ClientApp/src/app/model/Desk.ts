import { User } from '../user';

export interface Desk {
  id: Number;
  locationid: Number;
  bookedto: Date;
  bookedfrom: Date;
  isarchived: Boolean;
  bookby: User;
}


export interface Desklocation {
  id: Number;
  realDeskName: string;
  name: string;
  customerService: boolean;
  eccDesk: boolean;
  isbooked: boolean;
  desks: Desk[];
  floor: string;
}


export interface DeskDates {
  name: string;
  dates: Date;
}



export interface ResourceRoom {
  name: string;
  address: Date;
}



export interface Agreement {
  Id: Number;
  AcceptedDate: Date;
  UserName: string;

}
