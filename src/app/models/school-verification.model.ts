import {SchoolGrade} from '../enums/school-grade.enum';
import {JoiningSecondaryOrContinuing} from '../enums/joining-secondary-or-continuing.enum';

export class SchoolVerification {
  public id: number | null = null;
  public joiningSecondaryOrContinuing: JoiningSecondaryOrContinuing = null;
  public position: number = null;
  public grade: SchoolGrade = null;
  public academicYear: number = null;
  public principalComment: string = null;
  public admissionLetter: File = null;
}
