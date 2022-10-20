import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {ApplicationService} from '../../services/application-service.service';
import {faker} from '@faker-js/faker';
import {Users} from '../../enums/users.enum';
import {Address} from '../../models/address.model';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.applicationService.user.subscribe((next: User) => {
        this.user = next;
      },
      (error) => {
        console.error('An error occurred: ', error);
      });
    // const address: Address = new Address();
    // // address.address1 = faker.address.streetAddress();
    // // address.zipCode = faker.address.zipCode();
    // // address.postalCode = faker.address.secondaryAddress();
    // // address.wardName = faker.address.county();
    // // address.county = faker.address.county();
    // this.user = new User();
    // this.user.username = faker.internet.userName();
    // this.user.lastName = faker.name.lastName();
    // this.user.id = faker.seed();
    // this.user.userType = Users.USER;
    // this.user.firstName = faker.name.firstName();
    // this.user.middleName = faker.name.middleName();
    // this.user.password = faker.internet.password();
    // this.user.email = faker.internet.email();
    // this.user.status = 'A';
    // this.user.dateOfBirth = faker.date.birthdate();
    // this.user.telephone = faker.phone.number();
  }

}
