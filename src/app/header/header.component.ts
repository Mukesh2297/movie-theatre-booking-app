import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;

  adminAccess: boolean;

  constructor(private apiService: ApiService,
              private router: Router,
              private mainService: MainService) {
      this.userName = this.mainService.userName;
      this.adminAccess = this.mainService.adminAccess;
     }

  ngOnInit(): void {
  }

  logout() {
    let logOutResponse;

    this.apiService.post('auth/logout', {}).subscribe((logout) => {
      logOutResponse = logout;
      window.sessionStorage.removeItem('isLoggedIn');
      this.router.navigate(['/', 'login']);
    });
  }

}
