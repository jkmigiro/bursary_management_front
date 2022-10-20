import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApplicationService} from '../../services/application-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  errors;

  constructor(private fb: FormBuilder,
              private applicationService: ApplicationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });

  }

  login(): void {
    console.log('Logging in...');
    this.submitted = true;
    this.applicationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(value => {
        console.log('Log in successful: ', value);
        this.router.navigate(['profile']);
      }, error => {
        console.log('There was an error logging in: ', error);
        this.errors = 'There was an error logging in ' + error.message;
      }, () => {
        console.log('Complete');
      });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }
}
