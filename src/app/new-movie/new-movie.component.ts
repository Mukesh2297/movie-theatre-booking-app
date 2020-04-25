import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css'],
})
export class NewMovieComponent implements OnInit {
  apiResponse;
  apiResponseMessage: string;

  @ViewChild('movieForm') private formDirective: NgForm;

  constructor(public http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {}

  update(movieForm) {
    const newMovieDetails = movieForm.value;

    // const newMovieDetails = {
    //   name: movie_name,
    //   ticket_price: `${ticket_price}`,
    // };

    this.apiService.post('movies', newMovieDetails).subscribe((response) => {
      this.apiResponse = response;
      if (this.apiResponse.status === 'OK') {
        this.apiResponseMessage = 'Movie Created';
        setTimeout(() => {
          movieForm.form.reset();
          this.formDirective.resetForm();
          this.apiResponseMessage = '';
        }, 1000);
      } else {
        this.apiResponseMessage = 'Something went wrong';
        setTimeout(() => {
          movieForm.form.reset();
          this.formDirective.resetForm();
          this.apiResponseMessage = '';
        }, 1000);
      }
    });
  }
}
