import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  apiResponseMessage;

  updateContent;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) { }

  ngOnInit() {this.updateContent = this.data;
  }

  update(form) {
    const formData = form.value;

    const newHallDetails = {id: this.updateContent.hall_id,
      name: formData.name, total_columns: formData.total_columns, total_rows: formData.total_rows};

    console.log(newHallDetails);

    this.apiService.put('halls', newHallDetails).subscribe(response => console.log(response));



    // this.apiService.post('halls', newHallDetails).subscribe((response) => {
    //   this.apiResponse = response;
    //   if (this.apiResponse.status === 'OK') {
    //     this.apiResponseMessage = 'Hall Created';
    //     setTimeout(() => {
    //       form.form.reset();
    //       this.formDirective.resetForm();
    //       this.apiResponseMessage = '';
    //     }, 1000);
    //   } else {
    //     this.apiResponseMessage = 'Something went wrong';
    //     setTimeout(() => {
    //       form.form.reset();
    //       this.formDirective.resetForm();
    //       this.apiResponseMessage = '';
    //     }, 2000);
    //   }
    // });
  }


}
