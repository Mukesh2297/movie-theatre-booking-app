import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  apiResponse;

  constructor(public apiService:ApiService){
    this.apiService.get("bookings").subscribe((response)=>
    {
      this.apiResponse = response;
    })
   }

  ngOnInit(): void {
  }

}
