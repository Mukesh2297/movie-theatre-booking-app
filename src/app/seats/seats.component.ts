import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient,HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  displayMovieSelector:boolean = false;

  movieTitle:boolean = false;

  movies;

  shows;

  hallAvailability;

  showStatus;

  isHallSelected:boolean = false;

  markedSeats:any[] = [];

  bookedSeats:any[] = [];

  totalRowsCount: number;

  rows:number[] = [];

  totalColumnsCount:number;

  columns: number[] = [];




  constructor(public SeatBooking:MainService, public http:HttpClient)
  {}
  
  ngOnInit(): void {}
  

  seatSelected(row,column){}

  DisplayMovieSelector(request:boolean)
  {
    this.movies = this.SeatBooking.movies;
    this.shows = this.SeatBooking.shows;
    this.hallAvailability = this.SeatBooking.hallAvailability;
    this.movies= this.movies.movies.map(movieslist=>{return movieslist});
    this.shows = this.shows.movies.map(showTime=>{return showTime});
    this.totalRowsCount =   this.hallAvailability.hallDetail.total_rows;
    this.totalColumnsCount = this.hallAvailability.hallDetail.total_columns;
    this.columns = Array(this.totalColumnsCount).fill(0);
    this.rows = Array(this.totalRowsCount).fill(0);
    this.displayMovieSelector = request;
  
  }

  bookSeats()
  {
    this.isHallSelected = true;
    console.log(this.totalColumnsCount , this.totalRowsCount);
  }

  isSeatAvailable (i,j) {
    return this.hallAvailability.availability.filter(e=>e.sequence_number===(i*this.columns.length)+(j+1)).length > 0
  }

  submit()
  {
    
    this.bookedSeats = this.markedSeats;
    console.log(this.movies);
    console.log(this.shows);
    console.log(this.showStatus);
    
  }
 


}
