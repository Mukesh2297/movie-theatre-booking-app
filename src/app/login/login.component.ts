import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { MainService } from "../main.service";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signupform: boolean = false;
  loginform: boolean = false;
  apiLoginResponse: string;
  apiRegisterResponse: string;

  ExistingUsers;

  userDetails: any[] = [];

  credentialsValid: boolean = false;

  routeLink: string;

  hideRegisterPassword: boolean = true;

  hideLoginPassword: boolean = true;

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,30}$/;

  mobilePattern = /^[789]\d{9}$/;

  emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  signupformTemplate: FormGroup;

  constructor(
    public Mainservice: MainService,
    public http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.signupformTemplate = new FormGroup({
      fullname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(this.passwordPattern),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern),
      ]),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.mobilePattern),
      ]),
    });
  }

  displayLoginForm(request) {
    if (request.target.value === "Sign Up") {
      this.apiLoginResponse = "";
      this.apiRegisterResponse = "";
      this.signupform = true;
      this.loginform = false;
    } else if (request.target.value == "Login") {
      this.apiLoginResponse = "";
      this.apiRegisterResponse = "";
      this.loginform = true;
      this.signupform = false;
    }
  }

  Register() {
    const body = this.signupformTemplate.value;

    let signupResponse;

    this.apiService.post("auth/signup", body).subscribe((response) => {
      signupResponse = response;
      if (signupResponse.status == "OK") {
        this.dialog.open(DialogBoxComponent, {
          data: { message: "Registeration Successful" },
        });
        this.signupform = false;
        this.loginform = true;
      } else if (signupResponse.status == "Server error") {
        this.apiRegisterResponse = "Something went wrong. Please try again";
      }
    });
  }

  SignIn(regEmail, regPasswrd) {
    let loginResponse;
    let loginEmail = regEmail.value;
    let loginPassword = regPasswrd.value;

    const params = {
      username: loginEmail,
      password: loginPassword,
    };

    this.apiService.post("auth/login", params).subscribe((response) => {
      loginResponse = response;
      if (loginResponse.status == "OK" && loginResponse.role == "USER") {
        this.apiLoginResponse = "";
        this.Mainservice.adminAccess = false;
        this.Mainservice.userName = loginResponse.full_name;
        window.sessionStorage.setItem("isLoggedIn", "true");
        this.router.navigate(["/"]);
      } else if (
        loginResponse.status == "OK" &&
        loginResponse.role == "ADMIN"
      ) {
        this.Mainservice.userName = loginResponse.full_name;
        this.Mainservice.adminAccess = true;
        this.apiLoginResponse = "";
        window.sessionStorage.setItem("isLoggedIn", "true");
        this.router.navigate(["/", "admin"]);
      } else if (loginResponse.status == "Server error") {
        this.apiLoginResponse = "Invalid Username or Password";
      }
    });
  }
}
