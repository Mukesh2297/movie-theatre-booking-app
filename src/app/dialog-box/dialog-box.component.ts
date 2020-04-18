import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../main.service';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public mainService:MainService){}

  ngOnInit(): void {
  }

  myBookings()
  {
    this.mainService.myBooking();
  }


}
