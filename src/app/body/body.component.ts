import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/authService.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  adminAccess:boolean;

  constructor(  private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (!user) {
        return null;
      }
      this.adminAccess = user.role === 'ADMIN';
      console.log(this.adminAccess)
    });
  }

}
