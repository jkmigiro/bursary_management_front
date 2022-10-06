import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApplicationService} from '../../services/application-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private applicationService: ApplicationService) {
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
    this.applicationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }
}
