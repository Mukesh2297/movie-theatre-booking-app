import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'seats-booking';

  constructor(private router: Router) {}

  ngOnInit() {
    const sessionStorage = window.sessionStorage.getItem('isLoggedIn');

    if (sessionStorage === 'true' ) {
      this.router.navigate(['/', window.location.pathname.replace('/', '')]);
    } else {
      this.router.navigate(['/', 'login']);
    }
  }

}
