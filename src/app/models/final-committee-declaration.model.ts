import {Application} from './application.model';
import {WardAdministrator} from './ward-administrator.model';
import {User} from './user.model';

export class FinalCommitteeDeclaration {
  public id: number = null;
  public isApproved: boolean = null;
  public reasons: string = null;
  public fundAdminSign: File = null;
  public fundChairmanSign: File = null;
  public bursaryAwarded: number = null;
  public application: Application = null;
  public familyStatusComment: string = null;
  public wardAdministrator: User;
}
