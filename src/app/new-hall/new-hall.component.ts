import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-hall',
  templateUrl: './new-hall.component.html',
  styleUrls: ['./new-hall.component.css'],
})
export class NewHallComponent implements OnInit {
  apiResponse;

  apiResponseMessage: string;

  @ViewChild('hallForm') private formDirective: NgForm;

  constructor(public http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {}

  update(form) {
    const newHallDetails = form.value;

    this.apiService.post('halls', newHallDetails).subscribe((response) => {
      this.apiResponse = response;
      if (this.apiResponse.status === 'OK') {
        this.apiResponseMessage = 'Hall Created';
        setTimeout(() => {
          form.form.reset();
          this.formDirective.resetForm();
          this.apiResponseMessage = '';
        }, 1000);
      } else {
        this.apiResponseMessage = 'Something went wrong';
        setTimeout(() => {
          form.form.reset();
          this.formDirective.resetForm();
          this.apiResponseMessage = '';
        }, 2000);
      }
    });
  }
}
