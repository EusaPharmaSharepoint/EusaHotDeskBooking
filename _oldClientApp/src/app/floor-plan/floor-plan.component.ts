import { Component, OnInit } from '@angular/core';
import {GetService} from  '../Services/Get.Service'
import { Injectable } from "@angular/core";

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.css']
})
export class FloorPlanComponent implements OnInit {

  constructor(private _getService: GetService,) { }




  ngOnInit(): void {

  console.log(this._getService.getPosts());

  }

}
