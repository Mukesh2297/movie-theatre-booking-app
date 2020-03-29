import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-new-movie",
  templateUrl: "./new-movie.component.html",
  styleUrls: ["./new-movie.component.css"]
})
export class NewMovieComponent implements OnInit {
  constructor(public http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {}

  update(movieName, ticketPrice) {
    let movie_name = movieName.value;
    let ticket_price = ticketPrice.value;

    const newMovieDetails = {
      name: movie_name,
      ticket_price: `${ticket_price}`
    };

    this.apiService.post("movies", newMovieDetails).subscribe(response => {
      console.log(response);
    });
  }
}
