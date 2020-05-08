import { Component, OnInit, Inject, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-hall',
  templateUrl: './edit-hall.component.html',
  styleUrls: ['./edit-hall.component.css']
})
export class EditHallComponent implements OnInit {

  @Input() editHallObj: any;

  @Input() hallToBeEdited: any;

  @Input() isEdit: boolean;

  @Output() updateHall = new EventEmitter<any>();

  @Output() updateCancelled = new EventEmitter<any>();

  @Output() cancel = new EventEmitter<boolean>();

  apiResponse;

  apiResponseMessage;

  updateContent;

  name: string;

  totalColumns: number;

  totalRows: number;

  @ViewChild('hallForm') formDirective: NgForm;

  constructor( private apiService: ApiService) { }

  ngOnInit() {
    if (this.isEdit === true) {
    this.updateContent = this.hallToBeEdited;
    this.name = this.updateContent.name;
    this.totalColumns = this.updateContent.total_columns;
    this.totalRows = this.updateContent.total_rows;} else if (this.isEdit === false) {
      this.name = '' ;
      this.totalColumns = null;
      this.totalRows = null;
    }
  }

  update(form) {

    if (this.isEdit) {
    const formData = form.value;

    const newHallDetails = {id: this.updateContent.hall_id,
      name: formData.name, total_columns: formData.total_columns, total_rows: formData.total_rows};

    this.apiService.put('halls', newHallDetails).subscribe((response: any) => {
      if (response.hasError === false) {
    this.updateHall.emit(response); } else {
      this.apiResponseMessage = 'Something Went Wrong. Please try again'; }
    });
    } else {
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

  // emitUpdatedHall() {
  //   this.updateHall.emit('Data from Child COmponent');
  // }

  formEditCancel() {
    this.cancel.emit(true);
  }


}
