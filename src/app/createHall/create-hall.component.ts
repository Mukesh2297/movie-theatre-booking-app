import { Component, OnInit, ViewChild, NgModule} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../material/material.module';
import { MatInputModule } from '@angular/material/input';


@Component({
  templateUrl: './create-hall.component.html',
  styleUrls: ['./create-hall.component.css']
})

export class CreateHallComponent implements OnInit {

  @ViewChild('hallForm') private formDirective: NgForm;

  apiResponse;
  apiResponseMessage;

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
  }

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

@NgModule({
  declarations: [CreateHallComponent],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],

})

class CreateHallModule {

}



