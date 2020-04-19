import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'seats-booking';

  constructor(private router:Router)
  {
    let sessionStorage= window.sessionStorage.getItem("isLoggedIn");

    if(sessionStorage==="true")
    {
      router.navigate(["/",window.location.pathname.replace("/","")])
    }
    else
    {
      router.navigate(["/","login"])
    }
  }
}
