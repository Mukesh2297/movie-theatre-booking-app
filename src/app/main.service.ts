import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',

})
export class MainService {

  userName:string;

  selectedSeat:any[]=[];

  bookedSeats;

  movies;

  shows;

  hallAvailability;

  ExistingUsers;
  credentialsValid:boolean;

  constructor(private http:HttpClient, private router:Router) { }

  seatSelected(seatnum)
  {
    let seatNumber = seatnum.target.value;
    this.selectedSeat.push(seatNumber);
  }

  SignIn(regUname,regPasswrd)
  {

    let LoginUname = regUname.value;
    let LoginPassWord = regPasswrd.value;

    let LoginDetails = LoginUname.concat(","+LoginPassWord);

    this.ExistingUsers= localStorage.getItem("Users");
    this.ExistingUsers = JSON.parse(this.ExistingUsers);
    
    let NewUsers = this.ExistingUsers.map((ListItem,index)=>{return `${ListItem.UserName},${ListItem.Password}`})

    if(NewUsers.indexOf(LoginDetails) >=0)
    {
      sessionStorage.setItem("LoggedIn_Users",(JSON.stringify(LoginDetails)));

      this.credentialsValid = true;

      
      
        
    }

    else
    {
      this.credentialsValid = false;
      alert("Login Credentials does not match");

    }
    

    
  }
  
  myBooking()
  {
    this.router.navigate(["/","mybookings"])
  }




}
