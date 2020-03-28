import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {

  constructor(public http:HttpClient) { }

  ngOnInit(): void {
  }

  update(movieName,ticketPrice) {
    let movie_name = movieName.value;
    let ticket_price = ticketPrice.value;
  

    let newmovieDetails = new HttpParams()
      .set("name", movie_name)
      .set("ticket_price", `${ticket_price}`)

    this.http
      .post(
        "https://theatreapi.saileshkumar.com/movies",
        newmovieDetails.toString(),
        {
          headers: new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
          )
        }
      )
      .subscribe(response => {
        console.log(response);
      });
  }


}
