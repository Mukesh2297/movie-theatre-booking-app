import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  home = true;
  manage = false;
  displayMovieSelector = false;

  movieTitle = false;

  switch = '';

  movies;

  shows;

  hallAvailability;

  showStatus;

  movieId;

  hallId;

  isHallSelected = false;

  markedSeats: any[] = [];

  bookedSeats: any[] = [];

  totalRowsCount: number;

  rows: number[] = [];

  totalColumnsCount: number;

  columns: number[] = [];

  showSeats = false;

  constructor(public http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {}

  navigate(value) {
    if (value.index === 0) {
      this.switch = '';
    }
  }

  DisplayMovieSelector(request: boolean) {
    this.apiService.get('shows').subscribe((post) => {
      this.movies = post;
      this.movies = this.movies.shows.map((movieslist) => {
        return movieslist;
      });
    });
    this.displayMovieSelector = request;
  }

  bookSeats(showId) {
    this.isHallSelected = true;

    this.apiService.get(`showstatus/${showId}`).subscribe((hallDetails) => {
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
        (e) => e.sequence_number === i * this.columns.length + (j + 1)
      ).length > 0
    );
  }

  selectedMovie(moviename) {
    if (moviename.target.value === 'none') {
      this.shows = null;
      this.showSeats = false;
    } else {
      this.showSeats = false;

      this.movieId = moviename.target.value;

      const params = { id: this.movieId };

      this.apiService.get('movies/showtime', params).subscribe((showtime) => {
        this.shows = showtime;
        this.shows = this.shows.movies.map((showDetails) => {
          return showDetails;
        });
      });

      this.movieTitle = true;
    }
  }

  showsAvailable() {
    const hallId = this.hallId;

    this.shows = this.shows.movies.map((showTime) => {
      return showTime;
    });
  }

  logout() {
    let logOutResponse;

    this.apiService.post('auth/logout', {}).subscribe((logout) => {
      logOutResponse = logout;
    });
  }

  submit() {
    this.bookedSeats = this.markedSeats;
  }
}
