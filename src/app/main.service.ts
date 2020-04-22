import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',

})
export class MainService {

  userName = ' ';

  selectedSeat: any[] = [];

  bookedSeats;

  movies;

  shows;

  hallAvailability;

  ExistingUsers;
  credentialsValid: boolean;

  adminAccess = false;
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  seatSelected(seatnum) {
    const seatNumber = seatnum.target.value;
    this.selectedSeat.push(seatNumber);
  }

  SignIn(regUname, regPasswrd) {

    const LoginUname = regUname.value;
    const LoginPassWord = regPasswrd.value;

    const LoginDetails = LoginUname.concat(',' + LoginPassWord);

    this.ExistingUsers = localStorage.getItem('Users');
    this.ExistingUsers = JSON.parse(this.ExistingUsers);

    const NewUsers = this.ExistingUsers.map((ListItem, index) => `${ListItem.UserName},${ListItem.Password}`);

    if (NewUsers.indexOf(LoginDetails) >= 0) {
      sessionStorage.setItem('LoggedIn_Users', (JSON.stringify(LoginDetails)));

      this.credentialsValid = true;

    } else {
      this.credentialsValid = false;
      alert('Login Credentials does not match');

    }

  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.isLoggedIn);
    });
    return promise;
  }

  getUserRole(status: string, userRole: string, username: string) {
    console.log(new Date());
    if (status === 'OK' && userRole === 'ADMIN') {
     this.userName = username;
     this.adminAccess = true;
    } else if (status === 'OK' && userRole === 'USER') {
      this.userName = username;
      this.adminAccess = false;
    }
  }

  myBooking() {
    this.router.navigate(['/', 'mybookings']);
  }




}
