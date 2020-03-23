import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

}
