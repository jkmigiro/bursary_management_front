import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../../services/application-service.service';
import {Application} from '../../../models/application.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../models/user.model';
import {Users} from '../../../enums/users.enum';
import {ApplicationStatus} from '../../../enums/application-status.enum';
import {ApplicationConstants} from '../../../constants/application.constants';

@Component({
  selector: 'ngx-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss'],
})
export class AppDetailsComponent implements OnInit {
  application: Application;
  user: User;
  joiningSecondaryForm: FormGroup;
  schoolVerificationForm: FormGroup;
  wardAdministratorForm: FormGroup;
  updateApplicationForm: FormGroup;
  pendingStatus: ApplicationStatus = ApplicationStatus.PENDING;
  approvedStatus: ApplicationStatus = ApplicationStatus.APPROVED;
  rejectedStatus: ApplicationStatus = ApplicationStatus.REJECTED;
  JOINING_OR_CONTINUING = ApplicationConstants.JOINING_OR_CONTINUING;
  hasBenefittedFromFund: boolean;
  dayOrBoarder = ApplicationConstants.DAY_OR_BOARDER;
  isJoiningSecondaryOrContinuing: string;
  schoolGrades = ApplicationConstants.SCHOOL_GRADE;
  disabledForNoneStudents = false;
  studentsOnly = true;
  constructor(private applicationService: ApplicationService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.applicationService.selectedApplication.subscribe(value => {
      this.application = value;
    }, error => {
      console.log('Error: ', error);
    }, () => {
    });

    this.applicationService.user.subscribe(value => {
      this.user = value;
    }, error => {
      console.log('Error occured obtaining user: ', error);
    });
    this.joiningSecondaryForm = this.fb.group({
      totalFees: [this.application.joiningSecondary.totalFees],
      benefittedFromFund: [this.application.joiningSecondary.benefittedFromFund],
      benefittedFromFundAmount: [this.application.joiningSecondary.benefittedFromFundAmount],
      dayOrBoarder: [this.application.joiningSecondary.dayOrBoarder],
      outstandingBalance: [this.application.joiningSecondary.outstandingBalance],
    });

    this.schoolVerificationForm = this.fb.group({
      academicYear: [this.application.schoolVerification.academicYear],
      position: [this.application.schoolVerification.position],
      schoolGrade: [this.application.schoolVerification.grade],
      admissionLetter: [''],
      principalComment: [''], // for principal only
    });

    this.wardAdministratorForm = this.fb.group({
      id: [''], // user_id
      familyStatusComment: [''],
      name: [''],
    });

    this.updateApplicationForm = this.fb.group({
      joiningSecondaryForm: this.joiningSecondaryForm,
      schoolVerificationForm: this.schoolVerificationForm,
      wardAdministratorForm: this.wardAdministratorForm,
    });
  }

  onUpdateApplication(): void {
    const application: Application = new Application();
    switch (this.user.userType) {
      case Users.WARD_ADMINISTRATOR:
        application.wardAdministrator.id = this.user.id;
    }
  }

  getClassOfApplicationStatus(applicationStatus: ApplicationStatus): any {
    if (applicationStatus === this.pendingStatus) {
      return 'text-warning';
    } else if (applicationStatus === this.rejectedStatus) {
      return 'text-danger';
    } else {
      return 'text-success';
    }
  }

  changeBenefittedFromSecondary($event) {
    this.hasBenefittedFromFund = $event.target.value;
  }
}
