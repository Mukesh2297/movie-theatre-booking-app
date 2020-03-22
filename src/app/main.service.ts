import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  selectedSeat:any[]=[];

  constructor() { }

  seatSelected(seatnum)
  {
    let seatNumber = seatnum.target.value;
    this.selectedSeat.push(seatNumber);
  }




}
