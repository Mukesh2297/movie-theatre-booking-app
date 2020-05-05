import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeatsComponent } from './seats/seats.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { NewShowComponent } from './new-show/new-show.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './Filter/filter.pipe';
import { BookingsComponent } from './bookings/bookings.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { MatInputModule } from '@angular/material/input';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { CheckinComponent } from './checkin/checkin.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ApiService } from './services/api.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BodyComponent } from './body/body.component';
import { ScannerPopupComponent } from './scanner-popup/scanner-popup.component';
import { DateTimePipe } from './Filter/date-time.pipe';
import { EditHallComponent } from './edit-hall/edit-hall.component';
import { HallInfoComponent } from './hall-info/hall-info.component';
import { HallActionsComponent } from './hall-actions/hall-actions.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { ShowInfoComponent } from './show-info/show-info.component';
import { ShowsTableComponent } from './show-info/shows-table/shows-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SeatsComponent,
    LoginComponent,
    NewMovieComponent,
    NewShowComponent,
    AdminComponent,
    HomeComponent,
    FilterPipe,
    BookingsComponent,
    HeaderComponent,
    DialogBoxComponent,
    CheckinComponent,
    BodyComponent,
    ScannerPopupComponent,
    DateTimePipe,
    EditHallComponent,
    HallInfoComponent,
    HallActionsComponent,
    MoviesComponent,
    MovieInfoComponent,
    EditMovieComponent,
    ShowInfoComponent,
    ShowsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule,
    QRCodeModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
