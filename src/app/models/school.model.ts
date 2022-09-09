import {BankAccount} from './bank-account.model';
import {SchoolStatus} from '../enums/school-status.enum';

export class School {
  public id: number;
  public bankAccount: BankAccount;
  public schoolStatus: SchoolStatus;
  public schoolName: string;
}
