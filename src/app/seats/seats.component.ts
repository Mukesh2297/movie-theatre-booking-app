import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { AuthService, User } from '../auth/authService.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
})
export class SeatsComponent implements OnInit {
  movies;

  shows;

  hallAvailability;

  showStatus;

  showId: number;

  movieId;

  hallId;

  markedSeatsArr;

  isHallSelected = false;

  selectedShow: any[] = [];

  markedSeats: any[] = [];

  bookedSeats: any[] = [];

  totalRowsCount: number;

  rows: number[] = [];

  totalColumnsCount: number;

  columns: number[] = [];

  showSeats = false;

  apiResponse;

  dateArr: any[] = [];

  dayArr: any[] = [];

  movieSelected = false;

  btnValue = 0;

  constructor(
    public http: HttpClient,
    private apiService: ApiService,
    public matDialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit() {
    console.log('seats component');
    this.apiService.get('shows').subscribe((post) => {
      this.movies = post;
      this.movies = this.movies.shows.map((movieslist) => {
        return movieslist;
      });
    });
    this.DayValuePicker();
    this.DayPicker();
  }

  bookSeats(showId, Arrind, indexval) {
    const params = { id: showId };

    this.apiService.get(`bookings/show`, params).subscribe((hallDetails) => {
      this.hallAvailability = hallDetails;
      this.totalRowsCount = this.hallAvailability.hallDetail.total_rows;
      this.totalColumnsCount = this.hallAvailability.hallDetail.total_columns;
      this.columns = Array(this.totalColumnsCount).fill(0);
      this.rows = Array(this.totalRowsCount).fill(0);
      this.isHallSelected = true;
    });

    this.showSeats = true;

    this.showId = showId;

    this.selectedShow.push(this.shows[Arrind].availability[indexval]);
  }

  isSeatAvailable(i, j) {
    return (
      this.hallAvailability.availability.filter(
        (e) => e.sequence_number === i * this.columns.length + (j + 1)
      ).length > 0
    );
  }

  selectedMovie(moviename) {
    const ind = 0;

    this.btnValue = 0;

    this.movieSelected = true;

    this.showSeats = false;

    this.movieId = moviename.value;

    const formattedDate = this.getFormattedDate(ind);

    const params = { id: this.movieId, date: formattedDate };

    this.availableShows(params);
  }

  DisplayAvailableShows(ind) {
    this.btnValue = ind;

    const indexValue = ind;

    const formattedDate = this.getFormattedDate(indexValue);

    const params = { id: this.movieId, date: formattedDate };

    this.availableShows(params);
  }

  showsAvailable() {
    const hallId = this.hallId;

    this.shows = this.shows.movies.map((showTime) => {
      return showTime;
    });
  }

  seatSelected(i, j) {
    const selected = i * this.columns.length + (j + 1);

    if (this.markedSeats.indexOf(selected) !== -1) {
      const indexValue = this.markedSeats.indexOf(selected);
      this.markedSeats.splice(indexValue, 1);
    } else {
      this.markedSeats.push(selected);
    }
  }

  cancel() {
    this.isHallSelected = false;
    this.showSeats = false;
    this.selectedShow.splice(0);
    this.markedSeats.splice(0);
  }

  submit() {
    const bookedSeats = {
      sequence_numbers: this.markedSeats.join(','),
      show_id: this.showId,
    };

    this.apiService
      .post('bookings/booktickets', bookedSeats)
      .subscribe((response) => {
        this.apiResponse = response;

        if (this.apiResponse.status === 'OK') {
          // this.SeatBooking.bookedSeats = bookedSeats;
          this.matDialog.open(DialogBoxComponent, {
            data: { bookedSeats, info: 'booking' },
          });
          this.markedSeats.splice(0);
          this.selectedShow.splice(0);
          this.isHallSelected = false;
          this.showSeats = false;
        }
      });
  }

  DayValuePicker() {
    const currentDate = new Date();

    const currentDay = currentDate.getDay();

    for (let i = 0; i <= 4; i++) {
      let currentDayValue = currentDay + i;
      if (currentDayValue >= 7) {
        currentDayValue = currentDayValue - 7;
        this.dateArr.push(Math.abs(currentDayValue));
      } else {
        this.dateArr.push(currentDayValue);
      }
    }
  }

  DayPicker() {
    for (let i = 0; i <= this.dateArr.length; i++) {
      const dayValue = this.dateArr[i];

      switch (dayValue) {
        case 1:
          this.dayArr.push('Monday');
          break;
        case 2:
          this.dayArr.push('Tuesday');
          break;
        case 3:
          this.dayArr.push('Wednesday');
          break;
        case 4:
          this.dayArr.push('Thursday');
          break;
        case 5:
          this.dayArr.push('Friday');
          break;
        case 6:
          this.dayArr.push('Saturday');
          break;
        case 0:
          this.dayArr.push('Sunday');
      }
    }

    this.dayArr.splice(0, 1, 'Today');
    this.dayArr.splice(1, 1, 'Tomorrow');
  }

  getFormattedDate(ind) {
    const indexVal = ind;
    const currentDate = new Date();
    const numberOfDaysToAdd = Number(indexVal);
    const month = currentDate.toLocaleString('default', { month: 'short' });
    currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
    return `${currentDate.getDate()}-${month}-${currentDate.getFullYear()}`;
  }

  availableShows(bodyParams) {
    const params = bodyParams;

    this.apiService.get('movies/showtime', params).subscribe((showtime) => {
      this.shows = showtime;
      if (this.shows.movies.length === 0) {
        const errorArr = [{ hall_name: 'No Shows Available' }];
        this.shows = errorArr;
      } else {
        this.shows = this.shows.movies.map((showDetails) => {
          // this.movieTitle = false;
          return showDetails;
        });
      }
    });
  }
}
