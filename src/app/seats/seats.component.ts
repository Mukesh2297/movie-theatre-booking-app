import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "../services/api.service";
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';



@Component({
  selector: "app-seats",
  templateUrl: "./seats.component.html",
  styleUrls: ["./seats.component.css"],
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

  isHallSelected: boolean = false;

  selectedShow: any[] = [];

  markedSeats: any[] = [];

  bookedSeats: any[] = [];

  totalRowsCount: number;

  rows: number[] = [];

  totalColumnsCount: number;

  columns: number[] = [];

  showSeats: boolean = false;

  apiResponse;

  dateArr: any[] = [];

  dayArr: any[] = [];

  movieSelected: boolean = false;

  btnValue: number = 0;

  constructor(
    public SeatBooking: MainService,
    public http: HttpClient,
    private apiService: ApiService,
    public matDialog: MatDialog
  ) {
    this.apiService.get("shows").subscribe((post) => {
      this.movies = post;
      this.movies = this.movies.shows.map((movieslist) => {
        return movieslist;
      });
    });
    this.DayValuePicker();
    this.DayPicker();
  }

  ngOnInit(): void { }

  bookSeats(showId, Arrind, indexval) {

    const params = { id: showId }

    this.apiService.get(`bookings/show`, params)
      .subscribe((hallDetails) => {
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

    let ind = 0;

    this.btnValue = 0;

    this.movieSelected = true;

    this.showSeats = false;

    this.movieId = moviename.value;

    let formattedDate = this.getFormattedDate(ind)

    const params = { id: this.movieId, date: formattedDate };

    this.availableShows(params);

  }

  DisplayAvailableShows(ind) {
    this.btnValue = ind;

    let indexValue = ind;

    let formattedDate = this.getFormattedDate(indexValue);

    const params = { id: this.movieId, date: formattedDate };

    this.availableShows(params);
  }



  showsAvailable() {
    let hallId = this.hallId;

    this.shows = this.shows.movies.map((showTime) => {
      return showTime;
    });
  }

  seatSelected(i, j) {
    let selected = i * this.columns.length + (j + 1);

    if (this.markedSeats.indexOf(selected) != -1) {
      let indexValue = this.markedSeats.indexOf(selected);
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
    let bookedSeats = {
      sequence_numbers: this.markedSeats.join(","),
      show_id: this.showId,
    };

    this.apiService
      .post("bookings/booktickets", bookedSeats)
      .subscribe((response) => {
        this.apiResponse = response;

        if (this.apiResponse.status == "OK") {
          //this.SeatBooking.bookedSeats = bookedSeats;
          this.matDialog.open(DialogBoxComponent, { data: { bookedSeats, info:"booking"}})
          this.markedSeats.splice(0);
          this.selectedShow.splice(0);
          this.isHallSelected = false;
          this.showSeats = false;


        }

      });


  }


  DayValuePicker() {

    let currentDate = new Date();


    let currentDay = currentDate.getDay();

    for (let i = 0; i <= 4; i++) {
      let currentDayValue = currentDay + i;
      if (currentDayValue > 7) {
        currentDayValue = currentDayValue - 7;
        this.dateArr.push(Math.abs(currentDayValue));
      }
      else {
        this.dateArr.push(currentDayValue);
      }
    }

  }

  DayPicker() {

    for (let i = 0; i <= this.dateArr.length; i++) {
      let dayValue = this.dateArr[i];

      switch (dayValue) {
        case 1:
          this.dayArr.push("Monday");
          break;
        case 2:
          this.dayArr.push("Tuesday");
          break;
        case 3:
          this.dayArr.push("Wednesday");
          break;
        case 4:
          this.dayArr.push("Thursday");
          break;
        case 5:
          this.dayArr.push("Friday");
          break;
        case 6:
          this.dayArr.push("Saturday");
          break;
        case 7:
          this.dayArr.push("Sunday");
      }

    }

    this.dayArr.splice(0, 1, "Today");
    this.dayArr.splice(1, 1, "Tomorrow");

  }


  getFormattedDate(ind) {

    let indexVal = ind;
    let currentDate = new Date();
    let numberOfDaysToAdd = Number(indexVal);
    let month = currentDate.toLocaleString('default', { month: 'short' });
    currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd)
    return `${currentDate.getDate()}-${month}-${currentDate.getFullYear()}`

  }

  availableShows(bodyParams) {

    let params = bodyParams;

    this.apiService.get("movies/showtime", params).subscribe((showtime) => {
      this.shows = showtime;
      if (this.shows.movies.length == 0) {
        let errorArr = [{ hall_name: "No Shows Available" }];
        this.shows = errorArr;
      }
      else {
        this.shows = this.shows.movies.map((showDetails) => {
          //this.movieTitle = false;
          return showDetails;
        });
      }

    });

  }

}




