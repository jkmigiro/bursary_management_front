import {Address} from './address.model';
import {Users} from '../enums/users.enum';
import {UserStatus} from '../enums/user-status.enum';
import {Role} from '../enums/role.enum';
import {Gender} from '../enums/gender.enum';

export class User {

  public id: number;
  public firstName: string = null;
  public userName: string = null;
  public middleName: string = null;
  public lastName: string = null;
  public gender: Gender = null;
  public telephone: string = null;
  public dateOfBirth: Date = null;
  public password: string = null;
  public status: UserStatus = null; // OK Inactive when user first signs up
  public dateJoined: Date = null;  // OK CurrentDate, SPRING
  public occupation: string = null; // OK YET
  public email: string = null; // OK for SignUp and Login
  public userType: Users = null; // NOT YET, Depends when signing up, Select Box
  public deleted: boolean = null; // False when signing up
  public addresses: Address[] = null; // OK though more input needed ONE ADDRESS ALLOWED FOR NOW
  public userRelations: User[] = null; // NOT NEEDED for NOW
  public role: Role = null; // NOT YET depends on user type SPRING BOOT
}
