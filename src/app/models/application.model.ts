import {User} from './user.model';
import {JoiningSecondary} from './joining-secondary.model';
import {SchoolVerification} from './school-verification.model';
import {FinalCommitteeDeclaration} from './final-committee-declaration.model';
import {Student} from './student.model';
import {ApplicationStatus} from '../enums/application-status.enum';
import {WardAdministrator} from './ward-administrator.model';
import {Document} from './document.model';
import {StudentRelation} from './student-relation.model';

export class Application {
  public id: number; // all
  public applicant: Student; // all
  public applicationDate: Date; // all
  public reviewedBy: User; // all
  public reviewedDate: Date; // all
  public type: string; // all
  public applicationStatus: ApplicationStatus; // all
  public joiningSecondary: JoiningSecondary; // student
  public schoolVerification: SchoolVerification; // student, principal
  public finalCommitteeDeclaration: FinalCommitteeDeclaration; // not needed
  public documents: Document[]; // student
  public studentRelations: StudentRelation[]; // Personal bado
 // all, default 0 !PENDING
  // public wardAdministrator: WardAdministrator; // ward_administrator
  public reasons: string;


}
