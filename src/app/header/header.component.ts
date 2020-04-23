import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/authService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string;

  adminAccess: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (!user) {
        return null;
      }
      this.userName = user.fullName;
      this.adminAccess = user.role === 'ADMIN';
    });
  }

  logout() {
    return this.authService.signOut();
  }
}
