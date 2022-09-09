import {User} from './user.model';
import {JoiningSecondary} from './joining-secondary.model';
import {SchoolVerification} from './school-verification.model';
import {FinalCommitteeDeclaration} from './final-committee-declaration.model';
import {Student} from './student.model';
import {ApplicationStatus} from '../enums/application-status.enum';

export class Application {
  public applicant: Student  = null;
  public doneBy: User  = null;
  public reviewedBy: User  = null;
  public reviewedDate: Date  = null;
  public type: string  = null;
  public applicationStatus: ApplicationStatus = null;
  public joiningSecondary: JoiningSecondary  = null;
  public schoolVerification: SchoolVerification  = null;
  public finalCommitteeDeclaration: FinalCommitteeDeclaration = null;


}
