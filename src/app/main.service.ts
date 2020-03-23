import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',

})
export class MainService {

  selectedSeat:any[]=[];


  movies;

  shows;

  hallAvailability;

  ExistingUsers;
  credentialsValid:boolean;

  constructor(private http:HttpClient) { }

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

      this.http.get("https://theatreapi.saileshkumar.com/movies").subscribe(post=>{
      this.movies = post})

      this.http.get("https://theatreapi.saileshkumar.com/showstatus/2").subscribe(availability=>{
      this.hallAvailability =  availability})

      this.http.get("https://theatreapi.saileshkumar.com/movies/showtime",
      {
      params: new HttpParams().set('id','2')
      }).subscribe(showtime=>{
      this.shows =  showtime})
        
    }

    else
    {
      this.credentialsValid = false;
      alert("Login Credentials does not match");

    }
    

    
  }




}
