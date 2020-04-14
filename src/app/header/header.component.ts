import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  logout() {
    let logOutResponse;

    this.apiService.post("auth/logout", {}).subscribe((logout) => {
      logOutResponse = logout;
    });
  }

}
