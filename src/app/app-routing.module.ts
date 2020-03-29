import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SeatsComponent } from "./seats/seats.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";

const routes: Routes = [
  { path: "home", component: SeatsComponent },
  { path: "admin", component: AdminComponent },
  { path: "admin/:home", component: AdminComponent },
  { path: "admin/:manage", component: AdminComponent },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
