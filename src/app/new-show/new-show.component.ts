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

     const showDetails = {
      movie_id: `${this.movieId}`,
      hall_id: `${this.hallId}`,
      show_time: `${showTime}`,
    };

    this.apiService.post("shows", showDetails).subscribe((response) => {
      this.apiresponse = response;
      if(this.apiresponse.status=="OK")
      {
        this.apiResponseMessage="Show Created"
      }
    });
    
  }
}
