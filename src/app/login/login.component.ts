import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
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
    private apiService: ApiService
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

  Register(uname, upassword, uemail) {
    let signupResponse;
    let username = uname.value;
    let password = upassword.value;
    let email = uemail.value;

    let body = new HttpParams()
      .set("name", username)
      .set("password", password)
      .set("email", email);

    // formData.append('name',username);
    // formData.append('password',password);
    // formData.append('email',email)

    //const userDetails = {name: username,password:password,email: email}

    this.http
      .post("/auth/signup", body.toString(), {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        ),
        withCredentials: true
      })
      .subscribe(response => {
        console.log(response);
        signupResponse = response;
        if (signupResponse.status == "OK") {
          alert("Registeration Successful");
        }
      });

    // this.userDetails[this.userDetails.length]= UserDetails;

    // localStorage.setItem("Users", (JSON.stringify(this.userDetails)));

    // alert('Registeration Successful');
  }

  SignIn(regEmail, regPasswrd) {
    let loginResponse;
    let loginEmail = regEmail.value;
    let loginPassword = regPasswrd.value;

    // let body = new HttpParams()
    //   .set("email", loginEmail)
    //   .set("password", loginPassword);

    // this.http
    //   .post("/auth/login", body.toString(), {
    //     headers: new HttpHeaders().set(
    //       "Content-Type",
    //       "application/x-www-form-urlencoded"
    //     ),
    //     withCredentials: true
    //   })
    //   .subscribe(response => {
    //     loginResponse = response;
    //     console.log(response);
    //     if (loginResponse.status == "OK" && loginResponse.role == "USER") {
    //       this.credentialsValid = true;
    //       this.routeLink = "/home";
    //     } else if (
    //       loginResponse.status == "OK" &&
    //       loginResponse.role == "ADMIN"
    //     ) {
    //       this.credentialsValid = true;
    //       this.routeLink = "/admin";
    //     }
    //   });

    const params = {
      email: loginEmail,
      password: loginPassword
    };

    this.apiService.post("auth/login", params).subscribe(response => {
      loginResponse = response;
      console.log(response);
      if (loginResponse.status == "OK" && loginResponse.role == "USER") {
        this.credentialsValid = true;
        this.routeLink = "/home";
      } else if (
        loginResponse.status == "OK" &&
        loginResponse.role == "ADMIN"
      ) {
        this.credentialsValid = true;
        this.routeLink = "/admin";
      }
    });
  }
}
