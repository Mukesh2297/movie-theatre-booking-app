import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupform:boolean = false;
  loginform:boolean = false;

  ExistingUsers;
  
  userDetails:any[]=[];

  credentialsValid:boolean = false;

  constructor(public Mainservice:MainService) { }

  ngOnInit(): void {
  }

  displayLoginForm(request)
  {
    if(request.target.value=="Sign Up")
    {
      this.signupform=true;
      this.loginform = false;
    }
    else if(request.target.value=="Login")
    {
      this.loginform=true;
      this.signupform = false;
    }
  }

  Register(uname,upassword,uemail)
  {
    let username = uname.value;
    let password = upassword.value;
    let email = uemail.value;
    
    const UserDetails = {UserName: username,Password:password,Email_ID: email}

    this.userDetails[this.userDetails.length]= UserDetails;

    localStorage.setItem("Users", (JSON.stringify(this.userDetails)));

    alert('Registeration Successful');

  }

  SignIn(regUname,regPasswrd)
  {

    
    this.Mainservice.SignIn(regUname,regPasswrd);
    this.credentialsValid = this.Mainservice.credentialsValid;

    
  }

}
