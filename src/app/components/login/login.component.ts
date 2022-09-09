import {Component, OnInit} from '@angular/core';
import {NbAuthToken, NbTokenLocalStorage} from '@nebular/auth';
import {NbTokenStorage} from '@nebular/auth/services/token/token-storage';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {


    // this.localStorage.set()
    //NbAuth
   // console.log('Item: ', this.localStorage.get());

  }

}
