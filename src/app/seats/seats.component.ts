import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { stringify } from "@angular/compiler/src/util";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-seats",
  templateUrl: "./seats.component.html",
  styleUrls: ["./seats.component.css"],
})
export class SeatsComponent implements OnInit {
  movieTitle: boolean = false;

  movies;

  shows;

  hallAvailability;

  showStatus;

  showId: number;

  movieId;

  hallId;

  markedSeatsArr;

  isHallSelected: boolean = false;

  selectedShow: any[] = [];

  markedSeats: any[] = [];

  bookedSeats: any[] = [];

  totalRowsCount: number;

  rows: number[] = [];

  totalColumnsCount: number;

  columns: number[] = [];

  showSeats: boolean = false;

  constructor(
    public SeatBooking: MainService,
    public http: HttpClient,
    private apiService: ApiService
  ) {
    this.apiService.get("shows").subscribe((post) => {
      this.movies = post;
      this.movies = this.movies.shows.map((movieslist) => {
        return movieslist;
      });
    });
  }

  ngOnInit(): void {}

  bookSeats(showId, index) {
    console.log(index);

    this.isHallSelected = true;

    this.apiService.get(`showstatus/${showId}`).subscribe((hallDetails) => {
      this.hallAvailability = hallDetails;
      this.totalRowsCount = this.hallAvailability.hallDetail.total_rows;
      this.totalColumnsCount = this.hallAvailability.hallDetail.total_columns;
      this.columns = Array(this.totalColumnsCount).fill(0);
      this.rows = Array(this.totalRowsCount).fill(0);
    });

    this.showSeats = true;

    this.showId = index;

    this.selectedShow.push(this.shows[this.showId]);
  }

  isSeatAvailable(i, j) {
    return (
      this.hallAvailability.availability.filter(
        (e) => e.sequence_number === i * this.columns.length + (j + 1)
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

      const params = { id: this.movieId };

      this.apiService.get("movies/showtime", params).subscribe((showtime) => {
        this.shows = showtime;
        this.shows = this.shows.movies.map((showDetails) => {
          return showDetails;
          console.log(this.shows);
        });
      });

      this.movieTitle = true;
    }
  }

  showsAvailable() {
    let hallId = this.hallId;

    this.shows = this.shows.movies.map((showTime) => {
      return showTime;
    });
  }

  seatSelected(i, j, event) {
    let selected = i * this.columns.length + (j + 1);

    let btnValue = event.target.value;

    console.log(typeof selected);
    console.log(typeof btnValue);

    if (selected == btnValue) {
      return true;
    }

    this.markedSeats.push(selected);

    this.markedSeatsArr = this.markedSeats.map((element) => {
      return element.toString();
    });

    console.log(this.markedSeats);

    console.log(this.markedSeatsArr);
  }

  cancel() {
    this.isHallSelected = false;
    this.showSeats = false;
    this.selectedShow.splice(0);
    console.log(this.selectedShow);
  }

  submit() {
    this.bookedSeats = this.markedSeats;
    console.log(this.movies);
    console.log(this.shows);
    console.log(this.showStatus);
  }
}
