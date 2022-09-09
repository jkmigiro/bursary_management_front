import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NbAuthService} from '@nebular/auth/services/auth.service';
import {Router} from '@angular/router';
import {NbAuthSocialLink} from '@nebular/auth/auth.options';
import {User} from '../../models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../models/country.model';
import {County} from '../../models/county.model';
import {CustomValidationService} from '../../services/customvalidation-service.service';
import {ApplicationConstants} from '../../constants/application.constants';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  protected service: NbAuthService;
  protected options: {};
  protected cd: ChangeDetectorRef;
  protected router: Router;
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  submitted: boolean = false;
  errors: string[];
  messages: string[];
  counties: string[];
  user: User;
  userType = ApplicationConstants.USERS;
  socialLinks: NbAuthSocialLink[];
  registerForm: FormGroup = this.fb.group({
    firstName: '',
    username: '',
    middleName: '',
    lastName: '',
    gender: '',
    telephone: '',
    dateOfBirth: '',
    password: ['', Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    occupation: '',
    email: '',
    userType: '',
  },
    {
      validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    });
  addressForm: FormGroup = this.fb.group({
    address1: '',
    address2: '',
    country: Country,
    county: County,
    subCounty: '',
    wardName: '',
    postalCode: '',
    zipCode: '',
  });

  constructor(private fb: FormBuilder,
              private customValidator: CustomValidationService) {
  }

  ngOnInit(): void {
  }

  register() {
    this.submitted = true;
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }


}
