import {User} from './user.model';
import {FamilyStatus} from '../enums/family-status.enum';

export class StudentRelation {
  public id: number;
  public name: string;
  public occupation: string;
  public user: User;
  public familyStatus: FamilyStatus; // Personal
  public grossIncomePerYear: number = null;
  public telephone: string;
}
