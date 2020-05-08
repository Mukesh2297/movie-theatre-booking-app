import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-new-show',
  templateUrl: './new-show.component.html',
  styleUrls: ['./new-show.component.css'],
})
export class NewShowComponent implements OnInit {

  @Input() private editObj;

  @Input() private isEditForm;

  @Output() editCancelled = new EventEmitter<boolean>();

  dt1;

  movies;

  editMovieId: number;

  editHallId: number;

  editShowTime;

  movieId: number;

  halls;

  hallId: number;



  apiresponse;

  apiResponseMessage: string;

  @ViewChild('showForm') private formDirective: NgForm;

  constructor(public http: HttpClient, private apiService: ApiService, private appService: AppService) {}

  ngOnInit(): void {

    console.log(this.isEditForm);

    this.apiService.get('movies').subscribe((response) => {
      this.movies = response;
      this.movies = this.movies.movies;
      if (this.isEditForm === true) {
        this.editMovieId = this.editObj.movieId;
      }
    });

    this.apiService.get('halls').subscribe((response) => {
      this.halls = response;
      this.halls = this.halls.halls;
      if (this.isEditForm === true) {
        const findObj = this.halls.find(obj => obj.name === this.editObj.hall_name);
        this.editHallId = findObj.hall_id;
        this.editShowTime = this.editObj.show_time;
        console.log(this.editHallId);
      }
    });

  }

  cancel() {
    this.editCancelled.emit(true);
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

    const datecalculator = () => {
      if (formattedShowTime.getDate() < 10) {
        return `0${formattedShowTime.getDate()}`;
      } else {
        return formattedShowTime.getDate();
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
    const date = datecalculator();
    const hours = hoursCalculator();
    const minutes = minutesCalculator();
    const seconds = secondsCalculator();

    const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    showTime.show_time = formattedDateTime;

    console.log(showTime);

    if (this.isEditForm === false) {

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

    } else if (this.isEditForm === true) {

      const params = {movie_id: showTime.movie_id,
        hall_id: showTime.hall_id,
        show_time: formattedDateTime,
        show_id: this.editObj.show_id,
      show_current_status: showTime.show_current_status};

      console.log(params);

      // this.apiService.put('shows', params).subscribe((response) => console.log(response));
    }
  }
}
