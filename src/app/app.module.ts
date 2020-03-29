import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeatsComponent } from './seats/seats.component';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NewHallComponent } from './new-hall/new-hall.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { NewShowComponent } from './new-show/new-show.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    SeatsComponent,
    LoginComponent,
    NewHallComponent,
    NewMovieComponent,
    NewShowComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  
