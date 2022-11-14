import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ApplicationService} from './application-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private auth: ApplicationService,
              private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
