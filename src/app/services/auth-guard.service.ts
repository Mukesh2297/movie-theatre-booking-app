import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MainService } from '../main.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private mainService: MainService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.mainService.isAuthenticated().then((authenticated: boolean) => {
            if (authenticated) {return true; } else {this.router.navigate(['/login']); }
        } );
    }
}
