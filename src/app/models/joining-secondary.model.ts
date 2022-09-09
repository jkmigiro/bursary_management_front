import {DayOrBoarder} from '../enums/day-or-boarding.enum';
import {JoiningSecondaryOrContinuing} from '../enums/joining-secondary-or-continuing.enum';

export class JoiningSecondary {

  public id: number | null = null;
  public outstandingBalance: number = null;
  public benefittedFromFund: boolean = null;
  public benefittedFromFundAmount: number;
  public dayOrBorder: DayOrBoarder = null;
  public totalFees: number = null;
  public feesStructure: File = null;
  public joiningSecondaryOrContinuing: JoiningSecondaryOrContinuing = null;
}
