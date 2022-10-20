import {User} from './user.model';
import {JoiningSecondary} from './joining-secondary.model';
import {SchoolVerification} from './school-verification.model';
import {FinalCommitteeDeclaration} from './final-committee-declaration.model';
import {Student} from './student.model';
import {ApplicationStatus} from '../enums/application-status.enum';
import {WardAdministrator} from './ward-administrator.model';

export class Application {
  public id: number; // all
  public applicant: Student  = null; // all
  public doneBy: User  = null;
  public applicationDate: Date = null; // all
  public reviewedBy: User  = null; // all
  public reviewedDate: Date  = null; // all
  public type: string  = null; // all
  public applicationStatus: ApplicationStatus = null; // all
  public joiningSecondary: JoiningSecondary  = null; // student
  public schoolVerification: SchoolVerification  = null; // student, principal
  public finalCommitteeDeclaration: FinalCommitteeDeclaration = null; // not needed
  public documents: File[]; // student
  public amountAwarded: number; // all, default 0 !PENDING
  public wardAdministrator: WardAdministrator; // ward_administrator
  public reasons: string;


}
