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
  
  ngOnInit(): void 
  {
  
    this.http.get("http://theatreapi.saileshkumar.com/movies").subscribe(post=>{
    this.movies = post})

    this.http.get("http://theatreapi.saileshkumar.com/showstatus/2").subscribe(availability=>{
    this.hallAvailability =  availability})

    this.http.get("http://theatreapi.saileshkumar.com/movies/showtime",
    {
      params: new HttpParams().set('id','2')
    }).subscribe(showtime=>{
    this.shows =  showtime})


  }
  

  seatSelected(row,column)
  {
    
    console.log(row,column);
    

    // let seatnum = seatNumber.target.value;

    
    // if(this.markedSeats.indexOf(seatnum)!= -1)
    // {
    //   let indexVal = this.markedSeats.indexOf(seatnum);

    //   this.markedSeats.splice(indexVal,1);

    // }
  
    // else
    // {
    
    //   this.markedSeats.push(seatnum);

    // }

   
  }

  DisplayMovieSelector(request:boolean)
  {
    this.movies= this.movies.movies.map(movieslist=>{return movieslist});
    this.shows = this.shows.movies.map(showTime=>{return showTime});
    this.totalRowsCount =   this.hallAvailability.hallDetail.total_rows;
    this.totalColumnsCount = this.hallAvailability.hallDetail.total_columns;
    this.columns = Array(this.totalColumnsCount).fill(0);
    this.rows = Array(this.totalRowsCount).fill(0);
    this.displayMovieSelector = request;
   

  //  this.http.get("https://53211877.ngrok.io/movies/showtimes/2").subscribe(post=>
  //  {
  //    this.shows =  post;

  //    console.log(this.shows);
  //  })

  //  this.http.get("https://53211877.ngrok.io/showstatus/2").subscribe(post=>
  //  {
  //    this.showStatus =  post;

  //    console.log(this.shows);
  //  })
    
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
