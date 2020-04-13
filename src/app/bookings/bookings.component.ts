import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  apiResponse;

  bookingsAvailable:boolean = false;

  constructor(public apiService:ApiService){
    this.apiService.get("bookings").subscribe((response)=>
    {
      this.apiResponse = response;
      this.apiResponse = this.apiResponse.bookings;
      if(this.apiResponse.length > 0)
      {
        this.bookingsAvailable = true;
      }
      console.log(this.apiResponse);
      
    })
   }

  ngOnInit(): void {
  }

  back()
  {
    history.back();
  }

}
