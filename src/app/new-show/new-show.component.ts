import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-new-show',
  templateUrl: './new-show.component.html',
  styleUrls: ['./new-show.component.css']
})
export class NewShowComponent implements OnInit {

  movies;

  movieId:number;

  halls;

  hallId:number;

  constructor(public http:HttpClient){}

  ngOnInit(): void {
    this.http.get('https://theatreapi.saileshkumar.com/movies',{ withCredentials: true})
    .subscribe(response=>
    { 
      this.movies = response;
      this.movies = this.movies.movies;
      console.log(this.movies);
    })

    this.http.get('https://theatreapi.saileshkumar.com/halls',{ withCredentials: true})
    .subscribe(response=>
    { 
      this.halls = response;
      this.halls = this.halls.halls;
      console.log(this.halls);
    })

  }

  movieSelected(movie_id)
  {
    this.movieId = movie_id.target.value;
  
  }

  hallSelected(hall_id)
  {
    this.hallId = hall_id.target.value;
  
  }

  update(time)
  {
    let showTime = time.value;

    let showDetails = new HttpParams()
    .set('movie_id',`${this.movieId}`)
    .set('hall_id',`${this.hallId}`)
    .set('show_time',`${showTime}`)

    this.http.post('https://theatreapi.saileshkumar.com/shows',showDetails.toString(),
    {headers:new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')})
    .subscribe(response=>{console.log(response)})
    
    
  }
  
}
