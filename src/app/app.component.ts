import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/authService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'seats-booking';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // this.authService.ping();
  }
}
