import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  displayMovieSelector:boolean = false;

  movieTitle:boolean = false;

  movies:any[]=[{name:'Bigil',ticket_price:120,movie_id:2},
  {name:'Viswasam',ticket_price:150,movie_id:3},
  {name:'Nayagi',ticket_price:180,movie_id:1}]

  shows:any[] = [{name:'hall1',show_time:"23:30:00",show_id:4},
  {name:'hall1',show_time:"20:30:00",show_id:3},
  {name:'hall1',show_time:"11:30:00",show_id:2},
  {name:'hall1',show_time:"15:30:00",show_id:1}]

  showStatus;



  markedSeats:any[] = [];

  bookedSeats:any[] = [];

  totalSeats:any[] = ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10"];

  totalRowsCount: number = 10

  rows:number[] = Array(this.totalRowsCount).fill(0)

  

  totalColumnsCount:number = 10;

  columns: number[] = Array(this.totalColumnsCount).fill(0)

  


  constructor(public SeatBooking:MainService, public http:HttpClient)
  {}
  
  ngOnInit(): void 
  {
  //   this.movies =  this.http.get("https://53211877.ngrok.io/movies").subscribe(post=>{
  //   this.movies  = post;
  //   console.log(this.movies);

  //  })


  //  this.shows= this.http.get("https://53211877.ngrok.io/movies/showtime?id=2")
  //  .subscribe(post=>
  //   {
  //     this.shows =  post;
  //     console.log(this.shows);
  //   })
  }
  

  seatSelected(seatNumber)
  {
    
    this.markedSeats.push(seatNumber);

    console.log(this.markedSeats);
    

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

  submit()
  {
    
    this.bookedSeats = this.markedSeats;
    console.log(this.movies);
    console.log(this.shows);
    console.log(this.showStatus);
    
  }
 


}
