import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  home: boolean = false;
  manage: boolean = false;
  displayMovieSelector: boolean = false;

  movieTitle: boolean = false;

  movies;

  shows;

  hallAvailability;

  showStatus;

  movieId;

  hallId;

  isHallSelected: boolean = false;

  markedSeats: any[] = [];

  bookedSeats: any[] = [];

  totalRowsCount: number;

  rows: number[] = [];

  totalColumnsCount: number;

  columns: number[] = [];

  showSeats: boolean = false;

  constructor(public SeatBooking: MainService, public http: HttpClient) {}

  ngOnInit(): void {}

  seatSelected(row, column) {}

  navigate(value) {
    if (value == "home") {
      this.home = true;
      this.manage = false;
    } else {
      this.manage = true;
      this.home = false;
    }
  }

  DisplayMovieSelector(request: boolean) {
    this.http.get("/shows", { withCredentials: true }).subscribe(post => {
      this.movies = post;
      this.movies = this.movies.shows.map(movieslist => {
        return movieslist;
      });
    });
    //this.shows = this.SeatBooking.shows;
    this.displayMovieSelector = request;
  }

  bookSeats(showId) {
    this.isHallSelected = true;

    this.http
      .get(`/showstatus/${showId}`, { withCredentials: true })
      .subscribe(hallDetails => {
        this.hallAvailability = hallDetails;
        this.totalRowsCount = this.hallAvailability.hallDetail.total_rows;
        this.totalColumnsCount = this.hallAvailability.hallDetail.total_columns;
        this.columns = Array(this.totalColumnsCount).fill(0);
        this.rows = Array(this.totalRowsCount).fill(0);
      });

    this.showSeats = true;
  }

  isSeatAvailable(i, j) {
    return (
      this.hallAvailability.availability.filter(
        e => e.sequence_number === i * this.columns.length + (j + 1)
      ).length > 0
    );
  }

  selectedMovie(moviename) {
    if (moviename.target.value == "none") {
      this.shows = null;
      this.showSeats = false;
    } else {
      this.showSeats = false;

      this.movieId = moviename.target.value;

      this.http
        .get("/movies/showtime", {
          params: new HttpParams().set("id", this.movieId),
          withCredentials: true
        })
        .subscribe(showtime => {
          this.shows = showtime;
          this.shows = this.shows.movies.map(showDetails => {
            return showDetails;
          });
        });

      this.movieTitle = true;
    }

    // this.hallId = this.hallAvailability.hallDetail.hall_id;

    // console.log('Hall id', this.hallId);
  }

  showsAvailable() {
    let hallId = this.hallId;

    this.shows = this.shows.movies.map(showTime => {
      return showTime;
    });
  }

  submit() {
    this.bookedSeats = this.markedSeats;
    console.log(this.movies);
    console.log(this.shows);
    console.log(this.showStatus);
  }
}