import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { BookingsComponent } from './bookings/bookings.component';
import { CheckinComponent } from './checkin/checkin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: 'mybookings',
    component: BookingsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'checkin', component: CheckinComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HeaderComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
