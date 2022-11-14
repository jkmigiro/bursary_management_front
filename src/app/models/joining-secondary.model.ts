import {DayOrBoarder} from '../enums/day-or-boarding.enum';
import {JoiningSecondaryOrContinuing} from '../enums/joining-secondary-or-continuing.enum';
import {Application} from './application.model';
import {Document} from './document.model';

export class JoiningSecondary {

  public id: number | null = null;
  public application: Application;
  public outstandingBalance: number = null;
  public benefitedFromFund: boolean = null;
  public benefitedFromFundAmount: number;
  public dayOrBoarder: DayOrBoarder = null;
  public totalFees: number = null;
  public feesStructure: Document = null;
  public joiningSecondaryOrContinuing: JoiningSecondaryOrContinuing = null;
}
