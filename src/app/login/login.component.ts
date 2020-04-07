import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signupform: boolean = false;
  loginform: boolean = false;

  ExistingUsers;

  userDetails: any[] = [];

  credentialsValid: boolean = false;

  routeLink: string;

  constructor(
    public Mainservice: MainService,
    public http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  displayLoginForm(request) {
    if (request.target.value == "Sign Up") {
      this.signupform = true;
      this.loginform = false;
    } else if (request.target.value == "Login") {
      this.loginform = true;
      this.signupform = false;
    }
  }

  Register(uname, upassword, uemail,umobile) {
    let signupResponse;
    let username = uname.value;
    let password = upassword.value;
    let email = uemail.value;
    let mobileNo = umobile.value;

    const body = { name: username, password: password, email: email, mobile:mobileNo };

    this.apiService.post("auth/signup", body).subscribe((response) => {
      signupResponse = response;
      if (signupResponse.status == "OK") {
        this.signupform = false;
        this.loginform = true;
      }
    });
  }

  SignIn(regEmail, regPasswrd) {
    let loginResponse;
    let loginEmail = regEmail.value;
    let loginPassword = regPasswrd.value;

    const params = {
      email: loginEmail,
      password: loginPassword,
    };

    this.apiService.post("auth/login", params).subscribe((response) => {
      loginResponse = response;
      if (loginResponse.status == "OK" && loginResponse.role == "USER") {
        this.router.navigate(["/", "home"]);
      } else if (
        loginResponse.status == "OK" &&
        loginResponse.role == "ADMIN"
      ) {
        this.router.navigate(["/", "admin"]);
      }
    });
  }
}
