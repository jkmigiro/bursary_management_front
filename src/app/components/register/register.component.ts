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
import {faker} from '@faker-js/faker';
import {Address} from '../../models/address.model';
import {ApplicationService} from '../../services/application-service.service';
import {Role} from '../../models/role.model';
import {FileUploadService} from '../../services/file-upload.service';
import {UserStatus} from '../../enums/user-status.enum';

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
  counties: County[] = ApplicationConstants.COUNTIES;
  countries: Country[] = ApplicationConstants.COUNTRIES;
  user: User;
  userType = ApplicationConstants.USERS;
  gender = ApplicationConstants.GENDER;
  roles = ApplicationConstants.ROLE;
  socialLinks: NbAuthSocialLink[];
  selectedCountry: any = 110;
  photo: Map<string, File> = new Map();
  message: string;
// ,
// {
//   validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
// }
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

  registerForm: FormGroup = this.fb.group({
    id: [''],
    firstName: [''], username: [''],
    middleName: [''],
    lastName: [''],
    gender: [''],
    telephone: [''],
    dateOfBirth: [''],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    occupation: [''],
    email: [''],
    userType: [''],
    photo: [''],
    addressForm: this.addressForm,
  });

  constructor(private fb: FormBuilder,
              private customValidator: CustomValidationService,
              private applicationService: ApplicationService,
              private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  register() {
    this.submitted = true;
    console.log('Registration data: ', this.registerForm);
    const user = new User();
    const userAddresses: Address[] = [];
    const address: Address = new Address();
    const country: Country = new Country();
    const county: County = new County();
    const role: Role = new Role();
    const roles: Role[] = [];
    user.id = null;
    user.firstName = this.registerForm.get('firstName').value;
    user.username = this.registerForm.get('username').value;
    user.middleName = this.registerForm.get('middleName').value;
    user.lastName = this.registerForm.get('lastName').value;
    user.gender = this.registerForm.get('gender').value;
    user.telephone = this.registerForm.get('telephone').value;
    user.dateOfBirth = this.registerForm.get('dateOfBirth').value;
    user.password = this.registerForm.get('password').value;
    user.status = UserStatus.A;
    user.occupation = this.registerForm.get('occupation').value;
    user.email = this.registerForm.get('email').value;
    user.userType = this.registerForm.get('userType').value;
    user.deleted = false;
    user.photo = this.photo.get('photo');

    // Fill in address
    address.address1 = this.addressForm.get('address1').value;
    country.id = this.addressForm.get('country').value;
    county.id = this.addressForm.get('county').value;
    address.country = country;
    address.county = county;
    address.subCounty = this.addressForm.get('subCounty').value;
    address.wardName = this.addressForm.get('wardName').value; // To be used by students only
    address.postalCode = this.addressForm.get('postalCode').value;
    address.zipCode = this.addressForm.get('zipCode').value;

    userAddresses.push(address);
    user.addresses = userAddresses;
    role.roleName = this.roles.find(value => value.key === 'USER').key;
    roles.push(role);
    user.roles = roles;
    roles.forEach(value => console.log('Value= ', value));
    console.log('Status= ', user.status);
    console.log('User= ', user);
    this.applicationService.register(user);
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  get addressFormControl() {
    return this.addressForm.controls;
  }

  populateWithDummy(): void {
    const address = {
      address1: faker.address.streetAddress(true),
      address2: null,
      country: 110,
      county: faker.seed(47),
      subCounty: faker.address.county(),
      wardName: faker.address.cityName(),
      postalCode: faker.address.secondaryAddress(),
      zipCode: faker.address.zipCode(),
    };
    const user = {
      id: null,
      firstName: faker.name.firstName(),
      username: faker.internet.userName(),
      middleName: faker.name.middleName(),
      lastName: faker.name.lastName(),
      gender: faker.name.sex().substring(0).toLocaleUpperCase(),
      telephone: faker.phone.number(),
      dateOfBirth: faker.date.birthdate(),
      password: faker.internet.password(),
      occupation: faker.name.jobTitle(),
      email: faker.internet.email(),
      userType: 'STUDENT',
      photo: null,
      addressForm: address,
    };
    this.registerForm.setValue(user);
  }
  selectFiles(event): void {
    console.log('Event file uploaded: ', event.target.files);
  }

  selectFile(event, key): void {
    // this.studentDocuments.push(event.target.files[0]);
    this.photo.set(key, event.target.files[0]);
    console.log('Documents Map ', this.photo.size);
  }

  // Next we define upload() method for uploading each file:
  upload(file) {
    this.fileUploadService.upload(file).subscribe(
      event => {
      },
      err => {
        this.message = 'Could not upload the photo:' + file.name;
      });
  }
}
