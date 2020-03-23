import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeatsComponent } from './seats/seats.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path:"seatsbooking" , component:SeatsComponent},
  {path:"**",component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
