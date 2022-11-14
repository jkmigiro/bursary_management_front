import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../../services/application-service.service';
import {Application} from '../../../models/application.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {User} from '../../../models/user.model';
import {Users} from '../../../enums/users.enum';
import {ApplicationStatus} from '../../../enums/application-status.enum';
import {ApplicationConstants} from '../../../constants/application.constants';
import {faker} from '@faker-js/faker';
import {Student} from '../../../models/student.model';
import {Gender} from '../../../enums/gender.enum';
import {Role} from '../../../models/role.model';
import {School} from '../../../models/school.model';
import {BankAccount} from '../../../models/bank-account.model';
import {Bank} from '../../../models/bank.model';
import {Country} from '../../../models/country.model';
import {SchoolStatus} from '../../../enums/school-status.enum';
import {UserStatus} from '../../../enums/user-status.enum';
import {JoiningSecondary} from '../../../models/joining-secondary.model';
import {DayOrBoarder} from '../../../enums/day-or-boarding.enum';
import {JoiningSecondaryOrContinuing} from '../../../enums/joining-secondary-or-continuing.enum';
import {SchoolVerification} from '../../../models/school-verification.model';
import {SchoolGrade} from '../../../enums/school-grade.enum';
import {FinalCommitteeDeclaration} from '../../../models/final-committee-declaration.model';
import {County} from '../../../models/county.model';
import {StudentRelation} from '../../../models/student-relation.model';
import {FamilyStatus} from '../../../enums/family-status.enum';
import {UserRelation} from '../../../enums/user-relation.enum';
import {DialogComponent} from '../../dialog/dialog.component';
import {NbDialogService} from '@nebular/theme';

@Component({
  selector: 'ngx-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss'],
})
export class AppDetailsComponent implements OnInit {
  application: Application;
  applicant: Student;
  user: User;
  users: Users;
  joiningSecondaryForm: FormGroup;
  schoolVerificationForm: FormGroup;
  wardAdministratorForm: FormGroup;
  updateApplicationForm: FormGroup;
  pendingStatus: ApplicationStatus = ApplicationStatus.PENDING;
  approvedStatus: ApplicationStatus = ApplicationStatus.APPROVED;
  rejectedStatus: ApplicationStatus = ApplicationStatus.REJECTED;
  schoolStatuses = ApplicationConstants.SCHOOL_STATUS;
  familyStatuses = ApplicationConstants.FAMILY_STATUS;
  JOINING_OR_CONTINUING = ApplicationConstants.JOINING_OR_CONTINUING;
  hasBenefitedFromFund: boolean;
  formInvalid: boolean;
  benefitedFromFundValues: boolean[] = [];
  benefited: FormControl;
  dayOrBoarderValue: any;
  dayOrBoarder = ApplicationConstants.DAY_OR_BOARDER;
  dayOrBoarderChecked: string;
  isJoiningSecondaryOrContinuing: string;
  joiningSecondaryOrContinuing: string;
  schoolGrades = ApplicationConstants.SCHOOL_GRADE;
  schoolGrade: string;
  disabledForNoneStudents = false;
  studentsOnly = true;
  selectedFamilyStatus: any = 'NORMAL';
  schoolStatus: string;
  familyStatus: string;
  familyStatusKeys: string[] = Object.keys(FamilyStatus);
  familyStatusValues: string[] = Object.values(FamilyStatus);
  studentDetails: FormGroup;
  familyDetails: FormGroup;
  schoolDetails: FormGroup;
  schoolVerificationDetails: FormGroup;
  joiningSecondaryDetails: FormGroup;
  studentDeclaration: FormGroup;
  finalCommitteeDeclarationDetails: FormGroup;
  applicationForm: FormGroup;
  familyStatusesMap: Map<string, string> = new Map();
  counties: County[] = ApplicationConstants.COUNTIES;
  userType: string;
  isApproved: boolean;
  isValid: boolean;
  enablePrincipalInput: boolean;
  submitted: boolean;
  approvedOrRejected: boolean;

  constructor(private applicationService: ApplicationService,
              private fb: FormBuilder,
              private dialogService: NbDialogService) {
  }

  get studentDeclarationFormControl() {
    return this.studentDeclaration.controls;
  }

  get studentDetailsForm() {
    return this.studentDetails.controls;
  }

  get familyDetailsForm() {
    return this.familyDetails.controls;
  }

  get schoolDetailsForm() {
    return this.schoolDetails.controls;
  }

  get schoolVerificationDetailsForm() {
    return this.schoolVerificationDetails.controls;
  }

  get joiningSecondaryDetailsForm() {
    return this.joiningSecondaryDetails.controls;
  }

  get finalCommitteeDeclarationDetailsForm() {
    return this.finalCommitteeDeclarationDetails.controls;
  }

  ngOnInit(): void {
    let indexOfS;
    this.benefitedFromFundValues.push(true);
    this.benefitedFromFundValues.push(false);

    this.applicationService.user.subscribe(value => {
      this.user = value;
      // this.user.userType = Users.PRINCIPAL;
    }, error => {
      console.log('Error occurred obtaining user: ', error);
    });
    this.user = new User();
    this.user.userType = Users.PRINCIPAL;


    const role: Role = {
      description: 'MANAGER', id: 0, roleName: 'MANAGER',
    };
    const country: Country = ApplicationConstants.COUNTRIES[110];
    const bank: Bank = {
      country: country,
      name: 'Co-operative Bank of Kenya',
      shortDescription: 'CO-OP',
      id: 0,
    };
    const bankAccount: BankAccount = {
      accountBranch: faker.finance.account(),
      accountName: faker.finance.accountName(),
      accountNumber: faker.finance.creditCardNumber(),
      id: 0,
    };

    const school: School = {
      bankAccount: bankAccount, id: 0, schoolName: 'Nyamira County School', schoolStatus: SchoolStatus.COUNTY,
    };


    this.applicant = {
      addresses: [],
      county: ApplicationConstants.COUNTIES[1],
      dateJoined: faker.date.past(),
      dateOfBirth: faker.date.birthdate(),
      deleted: false,
      email: 'jkmigiro@gmail.com',
      firstName: 'Jasper',
      forNumber: faker.seed(),
      gender: Gender.M,
      id: faker.seed(),
      id1: faker.seed(),
      lastName: 'Migiro',
      middleName: 'Keraita',
      nemisNumber: faker.random.alpha(),
      occupation: faker.name.jobTitle(),
      password: faker.internet.password(),
      photo: undefined,
      roles: [role],
      school: school,
      status: UserStatus.A,
      subCounty: 'Kitengela East',
      telephone: faker.phone.number(),
      userRelations: [],
      userType: Users.STUDENT,
      username: 'jaspermigiro',
      wardName: faker.address.state(),
      studentNumber: 1,
      studentDeclaration: true,
    };

    const joiningSecondary: JoiningSecondary = {
      id: 0,
      joiningSecondaryOrContinuing: JoiningSecondaryOrContinuing.CONTINUING,
      totalFees: faker.seed(100000),
      benefitedFromFund: faker.datatype.boolean(),
      benefitedFromFundAmount: faker.seed(100000),
      dayOrBoarder: DayOrBoarder.BOARDER,
      outstandingBalance: faker.seed(50000),
      feesStructure: null,
      application: this.application,
    };

    const reviewedBy: User = new User();
    reviewedBy.firstName = faker.name.firstName();
    reviewedBy.middleName = faker.name.middleName();
    reviewedBy.lastName = faker.name.lastName();

    const schoolVerification: SchoolVerification = {
      id: 0,
      academicYear: faker.seed(12),
      position: faker.seed(500),
      grade: SchoolGrade.A,
      principalComment: faker.random.alpha(100),
      admissionLetter: undefined,
      application: this.application,
    };
    const wardAdministrator: User = new User();
    wardAdministrator.firstName = faker.name.firstName();
    wardAdministrator.middleName = faker.name.middleName();
    wardAdministrator.lastName = faker.name.lastName();
    const finalCommitteeDeclaration: FinalCommitteeDeclaration = {
      application: undefined,
      bursaryAwarded: 0,
      familyStatusComment: faker.random.alphaNumeric(50),
      fundAdminSign: undefined,
      fundChairmanSign: undefined,
      id: 0,
      isApproved: true,
      reasons: faker.random.alphaNumeric(30),
      wardAdministrator: wardAdministrator,
    };

    this.application = {
      applicant: this.applicant,
      applicationDate: faker.date.recent(),
      applicationStatus: ApplicationStatus.PENDING,
      documents: [],
      finalCommitteeDeclaration: finalCommitteeDeclaration,
      id: 0,
      joiningSecondary: joiningSecondary,
      reasons: faker.random.alphaNumeric(100),
      reviewedBy: reviewedBy,
      reviewedDate: new Date(),
      schoolVerification: schoolVerification,
      type: faker.random.alphaNumeric(10),
      studentRelations: [],
    };

    this.application.studentRelations = [];
    const studentRelation: StudentRelation = {
      familyStatus: FamilyStatus.NORMAL,
      grossIncomePerYear: faker.seed(100000),
      id: 0,
      firstName: faker.name.firstName(),
      middleName: faker.name.middleName(),
      lastName: faker.name.lastName(),
      occupation: faker.name.jobTitle(),
      telephone: faker.phone.number(),
      student: this.applicant,
      userRelation: UserRelation.PARENT,
      application: this.application,
    };
    this.application.studentRelations.push(studentRelation);
    this.applicationService.selectedApplication.subscribe(value => {
      if (value != null || value !== undefined)
        this.application = value;
      console.log('Application In App Details= ', value);
    }, error => {
      console.log('Error: ', error);
    }, () => {
    });

    this.application.applicant.userType = Users.EDUCATION_OFFICIAL;
    // indexOfS = Object.values(FamilyStatus).indexOf(FamilyStatus.NORMAL as unknown as FamilyStatus);
    if (this.application.joiningSecondary !== undefined &&
      this.application.joiningSecondary.joiningSecondaryOrContinuing !== undefined) {
      indexOfS = Object.values(JoiningSecondaryOrContinuing)
        .indexOf(this.application.joiningSecondary.joiningSecondaryOrContinuing as unknown as
          JoiningSecondaryOrContinuing);

      this.joiningSecondaryOrContinuing = Object.keys(JoiningSecondaryOrContinuing)[indexOfS];
    }
    if (this.application.joiningSecondary !== undefined &&
      this.application.joiningSecondary.dayOrBoarder !== undefined) {
      indexOfS = Object.values(DayOrBoarder)
        .indexOf(this.application.joiningSecondary.dayOrBoarder as unknown as DayOrBoarder);
      this.dayOrBoarderChecked = Object.keys(DayOrBoarder)[indexOfS];
    }
    if (this.application.schoolVerification !== undefined &&
      this.application.schoolVerification.grade !== undefined) {
      indexOfS = Object.values(SchoolGrade)
        .indexOf(this.application.schoolVerification.grade as unknown as SchoolGrade);
      this.schoolGrade = Object.keys(SchoolGrade)[indexOfS];
    }

    if (this.application.applicant !== undefined &&
      this.application.applicant.school !== undefined &&
      this.application.applicant.school.schoolStatus !== undefined) {
      indexOfS = Object.values(SchoolStatus)
        .indexOf(this.applicant.school.schoolStatus as unknown as SchoolStatus);
      this.schoolStatus = Object.keys(SchoolStatus)[indexOfS];
    }
    if (this.application.applicant !== undefined &&
      this.application.studentRelations !== undefined &&
      this.application.studentRelations.length > 0) {

      indexOfS = Object.values(FamilyStatus)
        .indexOf(this.application.studentRelations[0].familyStatus as unknown as FamilyStatus);
      console.log('Getting family status index: ', indexOfS, 'this.application.studentRelations[0].familyStatus: ',
        this.application.studentRelations[0].familyStatus);
      this.familyStatus = Object.keys(FamilyStatus)[indexOfS];
    }
    finalCommitteeDeclaration.application = this.application;
    this.studentsOnly = this.user !== undefined &&
      this.user.userType !== this.getEnumKeyFromValue(Users, Users.STUDENT);

    this.approvedOrRejected = this.application.applicationStatus === ApplicationStatus.APPROVED ||
      this.application.applicationStatus === ApplicationStatus.REJECTED;

    this.userType = this.application.applicant !== undefined &&
    this.application.applicant.userType !== undefined ?
      this.getEnumKeyFromValue(Users, this.application.applicant.userType) : null;

    console.log('studentsOnly= ', this.studentsOnly, 'userType= ', this.userType,
      'studentsOnly || userType= ', !this.studentsOnly || this.userType !== 'PRINCIPAL');

    this.enablePrincipalInput = !this.studentsOnly || this.userType !== 'PRINCIPAL';

    console.log('enablePrincipalInput= ', this.enablePrincipalInput);

    this.studentDetails = this.fb.group({
      county: [this.application.applicant !== undefined && this.application.applicant.county !== undefined ?
        this.initFormControl(this.application.applicant.county.id) : undefined,
        [Validators.required]],
      subCounty: [this.application.applicant !== undefined ?
        this.initFormControl(this.application.applicant.subCounty) : undefined, [Validators.required]],
      wardName: [this.application.applicant !== undefined ?
        this.initFormControl(this.application.applicant.wardName) : '', [Validators.required]],
      nimsNumber: [this.application.applicant !== undefined ?
        this.initFormControl(this.application.applicant.nemisNumber) : '',
        [Validators.minLength(1), Validators.required]],
      forNumber: [this.application.applicant !== undefined ?
        this.initFormControl(this.application.applicant.forNumber) : ''],
      idNumber: [this.application.applicant !== undefined ?
        this.initFormControl(this.application.applicant.id1) : ''],
    });
    // console.log('School= ', this.applicant.school );
    // console.log('School Bank Account= ', this.applicant.school.bankAccount);
    this.schoolDetails = this.fb.group({
      schoolName: [this.application.applicant !== undefined && this.application.applicant.school !== undefined ?
        this.initFormControl(this.application.applicant.school.schoolName) : '', [Validators.required]],
      schoolStatus: [this.application.applicant !== undefined && this.application.applicant.school !== undefined
      && this.application.applicant.school.schoolStatus !== undefined ?
        this.application.applicant.school.schoolStatus : '', [Validators.required]],
      schoolAccountNumber: [this.application.applicant !== undefined && this.application.applicant.school !== undefined
      && this.application.applicant.school.bankAccount !== undefined ?
        this.initFormControl(this.application.applicant.school.bankAccount.accountNumber) : '',
        [Validators.required]],
      schoolAccountName: [this.application.applicant !== undefined && this.application.applicant.school !== undefined
      && this.application.applicant.school.bankAccount !== undefined ?
        this.initFormControl(this.application.applicant.school.bankAccount.accountName) : '', [Validators.required]],
      schoolAccountBankBranch: [this.application.applicant !== undefined &&
      this.application.applicant.school !== undefined
      && this.application.applicant.school.bankAccount !== undefined ?
        this.initFormControl(this.application.applicant.school.bankAccount.accountBranch) : '',
        [Validators.required]],
    });
    // for (let i = 0; i < 3; i++) {
    //   const document: Document = {
    //     application: this.application,
    //     dateUploaded: new Date(),
    //     fileName: faker.system.fileName(),
    //     filePath: faker.system.filePath(),
    //     fileType: faker.system.fileExt(),
    //     id: 0,
    //     remarks: faker.random.alphaNumeric(15),
    //     documentType: DocumentType.STUDENTS_BIRTH_CERTIFICATE,
    //     document: null};
    //   this.application.documents.push(document);
    // }
    console.log('Family Status= ', this.familyStatus);
    this.familyDetails = this.fb.group({
      parentOrGuardianFirstName: [
        this.application.studentRelations !== undefined &&
        this.application.studentRelations.length > 0 ?
          this.initFormControl(this.application.studentRelations[0].firstName) : '',
        [Validators.required]],
      parentOrGuardianMiddleName: [
        this.application.studentRelations !== undefined &&
        this.application.studentRelations.length > 0 ?
          this.initFormControl(this.application.studentRelations[0].middleName) : '',
      ],
      parentOrGuardianLastName: [
        this.application.studentRelations !== undefined &&
        this.application.studentRelations.length > 0 ?
          this.initFormControl(this.application.studentRelations[0].lastName) : '',
        [Validators.required]],
      parentOrGuardianOccupation: [
        this.application.studentRelations !== undefined &&
        this.application.studentRelations.length > 0 ?
          this.initFormControl(this.application.studentRelations[0].occupation) : '', [Validators.required]],
      parentOrGuardianTelephone: [
        this.application.studentRelations !== undefined &&
        this.application.studentRelations.length > 0 ?
          this.initFormControl(this.application.studentRelations[0].telephone) : '', [Validators.required,
          Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/)]],
      familyStatus: [this.application.studentRelations !== undefined && this.application.studentRelations.length > 0
        ?
        this.application.studentRelations[0].familyStatus : '', [Validators.required]],
      grossIncomePerYear: [
        this.application.studentRelations !== undefined &&
        this.application.studentRelations.length > 0 ?
          this.initFormControl(this.application.studentRelations[0].grossIncomePerYear) : '',
        [Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/)]],
      userRelation: [this.application.studentRelations !== undefined &&
      this.application.studentRelations.length > 0 ?
        this.application.studentRelations[0].userRelation : '', [Validators.required]],
      familyIncomeDocuments: [''],
      birthCertificate: [''],
      otherStudentDocuments: [''],
    });


    this.joiningSecondaryDetails = this.fb.group({
      totalFees: [this.application.joiningSecondary !== undefined ?
        this.initFormControl(this.application.joiningSecondary.totalFees) : '', [Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/),
        Validators.min(1)]],
      benefitedFromFund: [this.application.joiningSecondary !== undefined ?
        this.initFormControl(this.application.joiningSecondary.benefitedFromFund) : '', [Validators.required]],
      benefitedFromFundAmount: [this.application.joiningSecondary !== undefined ?
        this.initFormControl(this.application.joiningSecondary.benefitedFromFundAmount) : '',
        [this.benefitedFromFundAmountValidation(), Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/),
          Validators.min(1)]],
      dayOrBoarder: [this.application.joiningSecondary !== undefined ?
        this.initFormControl(this.application.joiningSecondary.dayOrBoarder) : '', [Validators.required]],
      outstandingBalance: [this.application.joiningSecondary !== undefined ?
        this.initFormControl(this.application.joiningSecondary.outstandingBalance) : '', [Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/)]],
      joiningSecondaryOrContinuing: [this.application.joiningSecondary !== undefined ?
        this.application.joiningSecondary.joiningSecondaryOrContinuing : '', [Validators.required]],
    });
    this.joiningSecondaryOrContinuing = this.application.joiningSecondary !== undefined ?
      this.application.joiningSecondary.joiningSecondaryOrContinuing : undefined;
    console.log('JoiningOrContinuing= ', this.joiningSecondaryOrContinuing, 'this.application.joiningSecondary.joiningSecondaryOrContinuing= ', this.application.joiningSecondary.joiningSecondaryOrContinuing);
    if (this.application.joiningSecondary !== undefined) {
      this.hasBenefitedFromFund = this.application.joiningSecondary.benefitedFromFund;
    }
    this.schoolVerificationDetails = this.fb.group({
      academicYear: [this.application.schoolVerification !== undefined ?
        this.initFormControl(this.application.schoolVerification.academicYear) : '',
        [this.continuingValidation(), Validators.min(1), Validators.pattern(/^[1-9]+[0-9]*$/)]],
      position: [this.application.schoolVerification !== undefined ?
        this.initFormControl(this.application.schoolVerification.position) : '', [this.continuingValidation(),
        Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/),
        Validators.min(1)]],
      schoolGrade: [this.schoolGrade !== undefined ?
        this.initFormControl(this.schoolGrade) : '', [this.continuingValidation()]],
      studentNumber: ['', []],
      principalComment: ['', [this.principalsCommentValidation()]],
    });
    this.finalCommitteeDeclarationDetails = this.fb.group({
      id: [''],
      isApproved: [this.application.finalCommitteeDeclaration !== undefined &&
        this.application.finalCommitteeDeclaration.isApproved !== undefined ?
        this.application.finalCommitteeDeclaration.isApproved : '', [Validators.required]],
      reasons: [this.application.finalCommitteeDeclaration !== undefined &&
      this.application.finalCommitteeDeclaration.reasons !== undefined ?
        this.application.finalCommitteeDeclaration.reasons : '', [Validators.required]], // Needed
      bursaryAwarded: [this.application.finalCommitteeDeclaration !== undefined &&
      this.application.finalCommitteeDeclaration.bursaryAwarded !== undefined ?
        this.application.finalCommitteeDeclaration.bursaryAwarded : '', [Validators.required,
        Validators.pattern(/^[+]?([.]\d+|\d+[.]?\d*)$/)]], // Needed
      familyStatusComment: [this.application.finalCommitteeDeclaration !== undefined &&
      this.application.finalCommitteeDeclaration.familyStatusComment !== undefined ?
        this.application.finalCommitteeDeclaration.familyStatusComment : '',
        [this.wardAdministratorValidation()]], // Needed
    });
    this.studentDeclaration = this.fb.group({
      studentDeclaration: ['', [Validators.requiredTrue]],
    });
    // this.content = Object.assign(this.content, this.contentForm.value);
    // this.joiningSecondaryForm = this.fb.group({
    //   totalFees: [this.initFormControl(this.application.joiningSecondary.totalFees), [Validators.min(0)]],
    //   benefitedFromFund: [this.initFormControl(this.application.joiningSecondary.benefitedFromFund)],
    //   benefitedFromFundAmount: [this.initFormControl(this.application.joiningSecondary.benefitedFromFundAmount)],
    //   dayOrBoarder: [this.initFormControl(this.dayOrBoarderChecked)],
    //   outstandingBalance: [this.initFormControl(this.application.joiningSecondary.outstandingBalance)],
    // });
    //
    // this.schoolVerificationForm = this.fb.group({
    //   academicYear: [this.initFormControl(this.application.schoolVerification.academicYear),
    //     [Validators.min(1), Validators.max(8)]],
    //   position: [this.initFormControl(this.application.schoolVerification.position)],
    //   schoolGrade: [this.initFormControl(this.schoolGrade)],
    //   admissionLetter: [''],
    //   principalComment: ['', [this.principalsCommentValidation()]],
    // });

    this.wardAdministratorForm = this.fb.group({
      id: [''], // user_id
      familyStatusComment: [this.application.finalCommitteeDeclaration !== undefined ?
        this.initFormControl(this.application.finalCommitteeDeclaration.familyStatusComment) : ''],
      name: [''],
    });
    this.updateApplicationForm = this.fb.group({
      joiningSecondaryForm: this.joiningSecondaryForm,
      schoolVerificationForm: this.schoolVerificationForm,
      wardAdministratorForm: this.wardAdministratorForm,
    });
    this.familyStatuses.forEach(value => {

      this.familyStatusesMap.set(value.value, value.key);
    });
    this.formInvalid = this.studentDetails.invalid;
    console.log('joiningSecondaryOrContinuing in checking for Principal is = ', this.joiningSecondaryOrContinuing, ' CurrentUser Type= ', this.user.userType);
  }

  onUpdateApplication(): void {
    // const application: Application = new Application();
    // switch (this.user.userType) {
    //   case Users.WARD_ADMINISTRATOR:
    //     application.wardAdministrator.id = this.user.id;
    // }
  }

  getEnumKeyFromValue(enumeration, value): any {
    let indexOfS: any;
    indexOfS = Object.values(enumeration)
      .indexOf(value as typeof enumeration);
    return Object.keys(enumeration)[indexOfS];
  }

  onStudentDetailsSubmit() {
    this.studentDetails.markAsDirty();

  }

  onFamilyDetailsSubmit() {
    this.familyDetails.markAsDirty();
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

  changeBenefitedFromSecondary($event) {
    this.hasBenefitedFromFund = $event.target.value;
    console.log('hasBenefitedFromFund= ', this.hasBenefitedFromFund);
  }

  onSchoolDetailsSubmit() {
    this.schoolDetails.markAsDirty();
  }

  onJoiningSecondaryDetailsSubmit() {
    this.joiningSecondaryDetails.markAsDirty();
  }

  onSchoolVerificationDetailsSubmit() {
    this.schoolVerificationDetails.markAsDirty();
  }

  applicationSubmit() {
    // console.log('benefited= ', this.benefited.value);
    this.submitted = true;
    switch (this.userType) {
      case 'STUDENT': {
        this.isValid = this.studentDetails.valid && this.familyDetails.valid && this.schoolDetails.valid
          && this.schoolVerificationDetailsForm.academicYear.valid && this.schoolVerificationDetailsForm.position.valid
          && this.schoolVerificationDetailsForm.schoolGrade.valid && this.joiningSecondaryDetails.valid;
        break;
      }
      case 'PRINCIPAL': {
        this.isValid = this.schoolVerificationDetailsForm.principalComment.valid;
        break;
      }
      case 'WARD_ADMINISTRATOR': {
        this.isValid = this.finalCommitteeDeclarationDetailsForm.familyStatusComment.valid;
        break;
      }
      case 'EDUCATION_OFFICIAL': {
        this.isValid = this.finalCommitteeDeclarationDetailsForm.isApproved.valid &&
          this.finalCommitteeDeclarationDetailsForm.reasons.valid &&
          this.finalCommitteeDeclarationDetailsForm.bursaryAwarded.valid;
      }

    }
    if (this.isValid) {
      const student: Student = this.application.applicant;
      const family: StudentRelation[] = this.application.studentRelations;
      const school = this.application.applicant.school;
      const updatedApplication: Application = new Application();
      updatedApplication.id = this.application.id;
      school.bankAccount = this.application.applicant.school.bankAccount;
      student.school = school;
      // student.county = new County();
      const joiningSecondary: JoiningSecondary = this.application.joiningSecondary;
      const schoolVerification: SchoolVerification = this.application.schoolVerification;
      const finalCommitteeDeclaration: FinalCommitteeDeclaration = this.application.finalCommitteeDeclaration;
      const sd: FormGroup = this.studentDetails;
      const fd: FormGroup = this.familyDetails;
      const schd: FormGroup = this.schoolDetails;
      const jsd: FormGroup = this.joiningSecondaryDetails;
      const svd: FormGroup = this.schoolVerificationDetails;
      const decl: FormGroup = this.studentDeclaration;
      const wardCl: FormGroup = this.wardAdministratorForm;
      const fscd: FormGroup = this.finalCommitteeDeclarationDetails;
      console.log('joiningSecondaryDetails= ', this.joiningSecondaryDetails);
      // const application: FormGroup = this.applicationForm;
      // const documents: File[] = [];

      // Student details
      // student.county.id = sd.get('county').value;
      student.subCounty = sd.get('subCounty').value;
      student.wardName = sd.get('wardName').value;
      student.nemisNumber = sd.get('nimsNumber').value;
      student.forNumber = sd.get('forNumber').value;
      student.id1 = sd.get('idNumber').value;
      student.studentDeclaration = decl.get('studentDeclaration').value;
      student.studentNumber = svd.get('studentNumber').value;
      student.userType = this.getEnumKeyFromValue(Users, Users.PRINCIPAL);

      console.log('Student= ', student);
      if (family.length > 0) {
        family[0].firstName = fd.get('parentOrGuardianFirstName').value;
        family[0].middleName = fd.get('parentOrGuardianMiddleName').value;
        family[0].lastName = fd.get('parentOrGuardianLastName').value;
        family[0].occupation = fd.get('parentOrGuardianOccupation').value;
        family[0].telephone = fd.get('parentOrGuardianTelephone').value;
        family[0].familyStatus = fd.get('familyStatus').value;
        family[0].grossIncomePerYear = fd.get('grossIncomePerYear').value;
        family[0].userRelation = fd.get('userRelation').value;
        family[0].application = updatedApplication;
        console.log('Family= ', family);
      }

      // File
      school.schoolName = schd.get('schoolName').value;
      school.schoolStatus = schd.get('schoolStatus').value;
      school.bankAccount.accountNumber = schd.get('schoolAccountNumber').value;
      school.bankAccount.accountName = schd.get('schoolAccountName').value;
      school.bankAccount.accountBranch = schd.get('schoolAccountBankBranch').value;

      console.log('school= ', school);
      student.school = school;
      joiningSecondary.totalFees = jsd.get('totalFees').value;
      joiningSecondary.benefitedFromFund = jsd.get('benefitedFromFund').value;
      joiningSecondary.benefitedFromFundAmount = jsd.get('benefitedFromFundAmount').value;
      joiningSecondary.dayOrBoarder = jsd.get('dayOrBoarder').value;
      joiningSecondary.outstandingBalance = jsd.get('outstandingBalance').value;
      joiningSecondary.joiningSecondaryOrContinuing = this.isJoiningSecondaryOrContinuing !== undefined ?
        this.getEnumKeyFromValue(JoiningSecondaryOrContinuing, this.isJoiningSecondaryOrContinuing) : null;
      // joiningSecondary.feesStructure = jsd.get('feesStructure').value;
      console.log('joiningSecondary= ', joiningSecondary);


      schoolVerification.academicYear = svd.get('academicYear').value;
      schoolVerification.position = svd.get('position').value;
      schoolVerification.grade = svd.get('schoolGrade').value;
      schoolVerification.principalComment = svd.get('principalComment').value;

      finalCommitteeDeclaration.isApproved = fscd.get('isApproved').value;
      finalCommitteeDeclaration.reasons = fscd.get('reasons').value;
      finalCommitteeDeclaration.bursaryAwarded = fscd.get('bursaryAwarded').value;
      finalCommitteeDeclaration.familyStatusComment = fscd.get('familyStatusComment').value;

      console.log('This user= ', this.user);
      if (this.userType === 'PRINCIPAL') {
        this.user.userType = this.getEnumKeyFromValue(Users, Users.PRINCIPAL);
        this.application.reviewedBy = this.application.applicant;
      }
      if (this.userType === 'WARD_ADMINISTRATOR') {
        this.user.userType = this.getEnumKeyFromValue(Users, Users.WARD_ADMINISTRATOR);
        finalCommitteeDeclaration.wardAdministrator = this.application.applicant;
      }

      if (finalCommitteeDeclaration.isApproved !== undefined) {
        if (finalCommitteeDeclaration.isApproved === true) {
          this.application.applicationStatus = this.getEnumKeyFromValue(ApplicationStatus, ApplicationStatus.APPROVED);
        } else {
          this.application.applicationStatus = this.getEnumKeyFromValue(ApplicationStatus, ApplicationStatus.REJECTED);
        }
      }
      // add principal comment
      console.log('schoolVerification= ', schoolVerification);
      // this.uploadFiles();
      console.log('isJoiningSecondaryOrContinuing= ', this.isJoiningSecondaryOrContinuing);
      const application: Application = new Application();
      this.application.applicant = student;
      this.application.applicationStatus =
        this.getEnumKeyFromValue(ApplicationStatus, this.application.applicationStatus);
      joiningSecondary.application = updatedApplication;
      schoolVerification.application = updatedApplication;
      finalCommitteeDeclaration.application = updatedApplication;
      this.application.studentRelations = family;
      console.log('dayOrBoarderValue= ', this.dayOrBoarderValue);
      console.log('Application when updating: ', this.application);
      console.log('JSON Format of Application= ', JSON.stringify(this.application));
      console.log('submitted: ', this.submitted);
      this.applicationService.updateApplication(this.application)
        .subscribe(value => {
          console.log('Update SuccessFul: ', value);
          this.submitted = false;
        }, error => {
          console.log('An error occurred updating the application: ', error);
          console.log('POST call in error', error);
          let errorOccurred;
          if (error.error == null) {
            errorOccurred = error.message;
          } else {
            errorOccurred = error.error.message;
          }
          this.dialogService.open(DialogComponent, {
            context: {
              title: 'Error',
              info: errorOccurred,
            },
          });
        }, () => {
          this.submitted = false;
        });
    } else {
      this.dialogService.open(DialogComponent, {
        context: {
          title: 'Error',
          info: 'The application form has errors',
        },
      });
    }
  }

  /** A hero's name can't match the given regular expression */
  principalsCommentValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      console.log('control.value= ', value, ' value.length= ', value.length);
      if (this.user.userType === Users.PRINCIPAL && value.length === 0) {
        console.log('In IF value.length= ', value.length);
        return {principalsComment: true};
      } else {
        console.log('In else');
        return null;
      }
    };
  }

  initFormControl(value: any): any {
    if (value === null || value === undefined) {
      return '';
    }
    return value;
  }

  feesStructureValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (this.isJoiningSecondaryOrContinuing !== undefined &&
        this.isJoiningSecondaryOrContinuing === 'JOINING' && value === undefined || null) {
        return {feesStructure: true};
      } else {
        return null;
      }
    };
  }

  benefitedFromFundAmountValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (this.joiningSecondaryDetails !== undefined &&
        this.joiningSecondaryDetails.get('benefitedFromFund').value === true &&
        value === undefined
        || value <= 0) {
        return {benefitedFromFundAmount: true};
      } else {
        return null;
      }
    };
  }

  joiningSecondaryValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value === undefined || value === null || value.length <= 0 &&
        this.isJoiningSecondaryOrContinuing !== undefined &&
        this.isJoiningSecondaryOrContinuing === 'JOINING') {
        return {joiningSecondary: true};
      } else {
        return null;
      }
    };
  }

  continuingValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value === undefined || value === null || value.length <= 0 &&
        this.isJoiningSecondaryOrContinuing !== undefined &&
        this.isJoiningSecondaryOrContinuing === 'CONTINUING') {
        return {continuing: true};
      } else {
        return null;
      }
    };
  }

  educationOfficialValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      console.log('Value in Education Official Check= ', value);

      if (value === undefined || value === null || value.length <= 0 &&
        this.userType !== undefined &&
        this.userType === 'EDUCATION_OFFICIAL') {
        return {educationOfficial: true};
      } else {
        return null;
      }
    };
  }

  wardAdministratorValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value === undefined || value === null || value.length <= 0 &&
        this.userType !== undefined &&
        this.userType === 'WARD_ADMINISTRATOR') {
        return {educationOfficial: true};
      } else {
        return null;
      }
    };
  }
}
