import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-show',
  templateUrl: './new-show.component.html',
  styleUrls: ['./new-show.component.css'],
})
export class NewShowComponent implements OnInit {
  dt1;

  movies;

  movieId: number;

  halls;

  hallId: number;

  apiresponse;

  apiResponseMessage: string;

  @ViewChild('showForm') private formDirective: NgForm;

  constructor(public http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get('movies').subscribe((response) => {
      this.movies = response;
      this.movies = this.movies.movies;
    });

    this.apiService.get('halls').subscribe((response) => {
      this.halls = response;
      this.halls = this.halls.halls;
    });
  }

  movieSelected(movieId) {
    this.movieId = movieId.value;
  }

  hallSelected(hallId) {
    this.hallId = hallId.value;
  }

  update(showForm) {
    const showTime = showForm.value;

    const formattedShowTime = new Date(showTime.show_time);

    const monthcalculator = () => {
      if (formattedShowTime.getMonth() < 10) {
        return `0${formattedShowTime.getMonth() + 1}`;
      } else {
        return formattedShowTime.getMonth() + 1;
      }
    };

    const secondsCalculator = () => {
      if (formattedShowTime.getSeconds() < 10) {
        return `0${formattedShowTime.getSeconds()}`;
      } else {
        return formattedShowTime.getSeconds();
      }
    };

    const minutesCalculator = () => {
      if (formattedShowTime.getMinutes() < 10) {
        return `0${formattedShowTime.getMinutes()}`;
      } else {
        return formattedShowTime.getMinutes();
      }
    };

    const hoursCalculator = () => {
      if (formattedShowTime.getHours() < 10) {
        return `0${formattedShowTime.getHours()}`;
      } else {
        return formattedShowTime.getHours();
      }
    };

    const year = formattedShowTime.getFullYear();
    const month = monthcalculator();
    const date = formattedShowTime.getDate();
    const hours = hoursCalculator();
    const minutes = minutesCalculator();
    const seconds = secondsCalculator();

    const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    showTime.show_time = formattedDateTime;

    this.apiService.post('shows', showTime).subscribe((response) => {
      this.apiresponse = response;
      if (this.apiresponse.status === 'OK') {
        this.apiResponseMessage = 'Show Created';
        setTimeout(() => {
          showForm.form.reset();
          this.formDirective.resetForm();
          this.apiResponseMessage = '';
        }, 1000);
      } else {
        this.apiResponseMessage = 'Something went wrong';
        setTimeout(() => {
          showForm.form.reset();
          this.formDirective.resetForm();
          this.apiResponseMessage = '';
        }, 1000);
      }
    });
  }
}
