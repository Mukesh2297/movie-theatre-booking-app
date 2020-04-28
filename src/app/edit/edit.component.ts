import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  apiResponseMessage;

  updateContent;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){this.updateContent = this.data;
  }

  update(form) {
    const newHallDetails = form.value;

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
