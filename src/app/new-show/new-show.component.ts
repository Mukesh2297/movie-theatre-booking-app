import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-new-show",
  templateUrl: "./new-show.component.html",
  styleUrls: ["./new-show.component.css"],
})
export class NewShowComponent implements OnInit {

  dt1;

  movies;

  movieId: number;

  halls;

  hallId: number;

  apiresponse;

  apiResponseMessage:string;

  constructor(public http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get("movies").subscribe((response) => {
      this.movies = response;
      this.movies = this.movies.movies;
    });

    this.apiService.get("halls").subscribe((response) => {
      this.halls = response;
      this.halls = this.halls.halls;
    });
  }

  movieSelected(movie_id) {
    this.movieId = movie_id.value;
  }

  hallSelected(hall_id) {
    this.hallId = hall_id.value;
  }

  update(dateTime) {

    let showTime = dateTime.value; 

    let formattedShowTime = new Date(showTime)


    let monthcalculator=()=>{

    if(formattedShowTime.getMonth() < 10){return `0${formattedShowTime.getMonth()+1}` }}

    let secondsCalculator = ()=>
    {
      if(formattedShowTime.getSeconds()<10){return `0${formattedShowTime.getSeconds()}`}
    }

    let hoursCalculator = ()=>
    {
      if(formattedShowTime.getHours() < 10 )
      {
        return `0${formattedShowTime.getHours()}`
      }
      else
      {
        return formattedShowTime.getHours();
      }
    }
    

    let year = formattedShowTime.getFullYear();
    let month = monthcalculator();
    let date = formattedShowTime.getDate();
    let hours = hoursCalculator();
    let minutes = formattedShowTime.getMinutes();
    let seconds = secondsCalculator();
     
    
    let formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`

    console.log(formattedDateTime);
    
      
     const showDetails = {
      movie_id: `${this.movieId}`,
      hall_id: `${this.hallId}`,
      show_time: `${formattedDateTime}`,
    };

    console.log(formattedDateTime);
    

    this.apiService.post("shows", showDetails).subscribe((response) => {
      this.apiresponse = response;
      if(this.apiresponse.status=="OK")
      {
        this.apiResponseMessage="Show Created"
      }
    });
    
  }
}
