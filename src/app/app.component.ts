import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { MainService } from './main.service';
import { HeaderComponent } from './header/header.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'seats-booking';

  userName;

  adminaccess;

  pingResponse: any;

  constructor(private router: Router, private apiService: ApiService, private mainService: MainService) {

  }

  ngOnInit() {

    this.apiService.get('auth/ping').subscribe((response: any) => {
      console.log(response);
      if (response.status === 'Unauthorized') {
        this.router.navigate(['/login']);
        console.log('navigating to login page');
      } else if (response.status === 'OK' && response.role === 'ADMIN') {
        this.router.navigate(['/admin'], {state: {login: response}});
      } else if (response.status === 'OK' && response.role === 'USER') {
        this.router.navigate(['/'], {state: {login: response}});
      }
      // console.log(mainService.userName, mainService.adminAccess);
    });

  }

  //   const sessionStorage = window.sessionStorage.getItem('isLoggedIn');

  //   if (sessionStorage === 'true' ) {
  //     this.router.navigate(['/', window.location.pathname.replace('/', '')]);
  //   } else {
  //     this.router.navigate(['/', 'login']);
  //   }
  // }

}
