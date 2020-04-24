import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/authService.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupform = false;
  loginform = true;
  apiLoginResponse: string;
  apiRegisterResponse: string;

  ExistingUsers;

  userDetails: any[] = [];

  credentialsValid = false;

  routeLink: string;

  hideRegisterPassword = true;

  hideLoginPassword = true;

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,30}$/;

  mobilePattern = /^[789]\d{9}$/;

  emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  signupformTemplate: FormGroup;

  captchaSvg: SafeHtml;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private sanitized: DomSanitizer
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
      password: new FormControl('', [
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
      captcha: new FormControl(null, [Validators.required]),
    });

    this.authService.getCaptcha().subscribe((response: any) => {
      this.captchaSvg = this.sanitized.bypassSecurityTrustHtml(
        response.captcha
      );
    });
  }

  displayLoginForm(request) {
    if (request.target.value === 'Sign Up') {
      this.apiLoginResponse = '';
      this.apiRegisterResponse = '';
      this.signupform = true;
      this.loginform = false;
    } else if (request.target.value === 'Login') {
      this.apiLoginResponse = '';
      this.apiRegisterResponse = '';
      this.loginform = true;
      this.signupform = false;
    }
  }

  Register() {
    const body = this.signupformTemplate.value;

    this.authService.signup(body).subscribe((response: any) => {
      if (response.status === 'OK') {
        this.dialog.open(DialogBoxComponent, {
          data: { message: 'Registeration Successful' },
        });
        this.signupform = false;
        this.loginform = true;
      } else if (response.status === 'Server error') {
        this.apiRegisterResponse = 'Something went wrong. Please try again';
      } else if (response.status === 'Unauthorized' && response.captcha) {
        this.captchaSvg = this.sanitized.bypassSecurityTrustHtml(
          response.captcha
        );
        this.apiRegisterResponse = 'Something went wrong. Please try again';
      }
    });
  }

  SignIn(loginForm) {
    let loginResponse;

    const params = loginForm.value;

    this.authService.signIn(params).subscribe((response) => {
      loginResponse = response;
      if (loginResponse.status === 'OK' && loginResponse.user.role === 'USER') {
        this.apiLoginResponse = '';
      } else if (
        loginResponse.status === 'OK' &&
        loginResponse.user.role === 'ADMIN'
      ) {
        this.apiLoginResponse = '';
      } else if (loginResponse.status === 'Server error') {
        this.Mainservice.isLoggedIn = false;
        this.apiLoginResponse = 'Invalid Username or Password';
      }
    });
  }
}
