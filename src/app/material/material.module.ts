import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'


const Material = [MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
]



@NgModule({
  exports:[Material]
})
export class MaterialModule { }
