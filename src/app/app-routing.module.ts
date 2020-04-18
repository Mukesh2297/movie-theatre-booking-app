import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { BookingsComponent } from "./bookings/bookings.component";
import { CheckinComponent } from "./checkin/checkin.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "mybookings", component: BookingsComponent },
  { path: "checkin", component: CheckinComponent },
  { path: "**", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
