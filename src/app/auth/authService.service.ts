import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export class User {
  fullName: string;
  role: string;
  id: string;
  constructor(fullName: string, role: string, id: string) {
    this.fullName = fullName;
    this.id = id;
    this.role = role;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  expiryTimer;

  constructor(private apiService: ApiService, private router: Router) {}

  signup(values) {
    return this.apiService.post('auth/signup', values);
  }

  getCaptcha() {
    return this.apiService.get('auth/captcha');
  }

  signIn(values) {
    return this.apiService.post('auth/login', values).pipe(
      tap((response: any) => {
        if (response.hasError) {return null;}
        const user = new User(
          response.user.full_name,
          response.user.role,
          response.user.id
        );
        this.user.next(user);
        this.expiryTimer = setTimeout(() => {
          this.user.next(null);
        }, response.cookieExpiryTime);
        if ((response.status === 'OK' && response.user.role === 'USER')  || (response.status === 'OK' && response.user.role === 'ADMIN')) {
          this.router.navigate(['/']);
        }})
    );
  }

  ping() {
    return this.apiService.get('auth/ping').pipe(
      map((response: any) => {
        if (!response.user) {
          return this.user.next(null);
        }
        const user = new User(
          response.user.full_name,
          response.user.role,
          response.user.id
        );
        this.user.next(user);
        const remainingExpiryTime =
          response.cookieExpiryTime - new Date().getTime();
        this.expiryTimer = setTimeout(() => {
          this.user.next(null);
        }, remainingExpiryTime);
        return user;
      })
    );
  }


  signOut() {
    return this.apiService.post('auth/logout').subscribe((response) => {
      this.user.next(null);
      clearTimeout(this.expiryTimer);
      this.router.navigate(['login']);
    });
  }
}
