import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, User } from './authService.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  user: User;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.user.subscribe((user) => (this.user = user));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.user) {
      return true;
    } else {
      return this.authService.ping().pipe(
        take(1),
        map((user) => {
          if (user) {
            return true;
          } else {
            return this.router.createUrlTree(['login']);
          }
        })
      );
    }

    // if (this.authService.user) {
    //   return true;
    // } else {
    //   this.authService.ping().pipe(
    //     map((user) => {
    //       if (user) {
    //         return true;
    //       } else {
    //         return this.router.createUrlTree(['login']);
    //       }
    //     })
    //   );
    // }
  }
}
