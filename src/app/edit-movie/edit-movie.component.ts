import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';


interface EditObj {
  name: string;
  ticket_price: number;
  movie_id: number;
}


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})

export class EditMovieComponent implements OnInit {
  apiResponse;
  apiResponseMessage: string;

  name: string;

  ticket_price: number;

  @Input() private editMovieObj: EditObj;

  @Input() public isEdit;

  @Output() cancel = new EventEmitter<boolean>();

  @Output() updateMovie = new EventEmitter<any>();

  @ViewChild('movieForm') private formDirective: NgForm;

  constructor(public http: HttpClient, private apiService: ApiService) {}

  ngOnInit() {
    if (this.isEdit === true) {
      this.name = this.editMovieObj.name;
      this.ticket_price = this.editMovieObj.ticket_price;
      } else if (this.isEdit === false) {
        this.name = null;
        this.ticket_price = null;
      }
  }

  update(movieForm) {
    if (this.isEdit) {
      const formData = movieForm.value;

      const newMovieDetails = {id: this.editMovieObj.movie_id,
        name: formData.name, ticket_price: formData.ticket_price};

      this.apiService.put('movies', newMovieDetails).subscribe((response: any) => {
        if (response.hasError === false) {
      this.updateMovie.emit(response); } else {
        this.apiResponseMessage = 'Something Went Wrong. Please try again'; }
      });
     } else {

    const newMovieDetails = movieForm.value;
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

  formEditCancel() {
    this.cancel.emit(true);
  }


}
