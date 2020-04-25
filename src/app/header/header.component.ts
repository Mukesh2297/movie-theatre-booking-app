import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../auth/authService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string;
  adminAccess: boolean;
  mobileDevice: boolean;

  constructor(
    private authService: AuthService,
    public route: ActivatedRoute,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (!user) {
        return null;
      }
      this.userName = user.fullName;
      this.adminAccess = user.role === 'ADMIN';
    });

    this.breakpointObserver
      .observe(['(min-width: 480px )'])
      .subscribe((result) => {
        if (result.matches) {
          this.mobileDevice = true;
        } else {
          this.mobileDevice = false;
        }
      });
  }

  logout() {
    return this.authService.signOut();
  }
}
