import {User} from './user.model';
import {FamilyStatus} from '../enums/family-status.enum';
import {UserRelation} from '../enums/user-relation.enum';
import {Student} from './student.model';

export class StudentRelation {
  public id: number;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public occupation: string;
  public student: Student;
  public familyStatus: FamilyStatus; // Personal
  public grossIncomePerYear: number = null;
  public telephone: string;
  public userRelation: UserRelation;
}
