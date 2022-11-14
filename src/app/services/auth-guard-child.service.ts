import { Injectable } from '@angular/core';
import {ApplicationService} from './application-service.service';
import {CanActivateChild, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardChild implements CanActivateChild{


  constructor(private auth: ApplicationService,
              private router: Router) { }

  canActivateChild(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
