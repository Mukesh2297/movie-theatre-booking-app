import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userInfo: any;

  userName: string;

  role: string;

  adminAccess: boolean;

  mobileDevice: boolean;

  stateResponse;

  constructor(private apiService: ApiService,
              private router: Router,
              private mainService: MainService,
              public route: ActivatedRoute, public breakpointObserver: BreakpointObserver) {
                // console.log(mainService.userName, mainService.adminAccess);
              }

  ngOnInit() {

    this.breakpointObserver.observe(['(min-width: 480px )'])
    .subscribe((result) => {if (result.matches) {this.mobileDevice = true; } else {this.mobileDevice = false; }});

    console.log(this.userInfo);

    this.userName = this.mainService.userName;
    this.adminAccess = this.mainService.adminAccess;
    // this.route
    //   .queryParams
    //   .subscribe(params => {
    //     // Defaults to 0 if no query param provided.
    //     this.stateResponse = +params.serviceId || 0;
    //   });

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
