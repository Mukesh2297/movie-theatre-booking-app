import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Router } from '@angular/router';
import { MainService } from '../main.service';


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userName:string;

  constructor(private apiService: ApiService,
    private router:Router,private MainService:MainService)
    {
      this.userName = this.MainService.userName;
    }

  ngOnInit(): void {}

  logout() {
    let logOutResponse;

    this.apiService.post("auth/logout", {}).subscribe((logout) => {
      logOutResponse = logout;
    });
  }

  mybookings()
  {
    this.router.navigate(["/", "mybookings"]);
  }
}
