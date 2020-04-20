import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  apiResponse;

  bookingsAvailable = false;

  userId: string;

  // userid:bookingid

  constructor(public apiService: ApiService, private mainService: MainService) {}

  ngOnInit(): void {
    this.apiService.get('bookings').subscribe((response: any) => {
      this.apiResponse = response.bookings.map((bookingObj) => {
        return {...bookingObj, qrdata: `${bookingObj.user_id}:${bookingObj.booking_id}`};
      });
      if (this.apiResponse.length > 0) {
        this.bookingsAvailable = true;
      }
    });
  }

  back() {
    history.back();
  }

}
