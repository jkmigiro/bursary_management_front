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
import {Document} from '../../../models/document.model';
import {DocumentType} from '../../../enums/document-type.enum';
import {WardAdministrator} from '../../../models/ward-administrator.model';
import {UserRelation} from '../../../enums/user-relation.enum';

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
  applicationForm: FormGroup;
  familyStatusesMap: Map<string, string> = new Map();
  counties: County[] = ApplicationConstants.COUNTIES;
  constructor(private applicationService: ApplicationService,
              private fb: FormBuilder) {
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
    this.user.userType = Users.STUDENT;
    console.log('UserType= ' , this.user.userType);

    const role: Role = {
      description: 'MANAGER', id: 0, roleName: 'MANAGER',
    };
    const country: Country = ApplicationConstants.COUNTRIES[110];
    const bank: Bank = {
      country: country,
      name: 'Co-operative Bank of Kenya',
      shortDescription: 'CO-OP',
      id: 0};
    const bankAccount: BankAccount = {
      accountBranch: faker.finance.account(),
      accountName: faker.finance.accountName(),
      accountNumber: faker.finance.creditCardNumber(),
      bank: bank,
      id: 0};

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
      studentRelation: undefined,
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

    const reviewedBy: User = new  User();
    reviewedBy.firstName = faker.name.firstName();
    reviewedBy.middleName  = faker.name.middleName();
    reviewedBy.lastName = faker.name.lastName();

    const schoolVerification: SchoolVerification = {
      id: 0,
      academicYear: faker.seed(12),
      position: faker.seed(500),
      grade: SchoolGrade.A ,
      principalComment: faker.random.alpha(100),
      admissionLetter: undefined,
      application: this.application,
    };
    const wardAdministrator: User = new  User();
    wardAdministrator.firstName = faker.name.firstName();
    wardAdministrator.middleName  = faker.name.middleName();
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
    };

    this.applicant.studentRelation = {
      familyStatus: FamilyStatus.NORMAL,
      grossIncomePerYear: faker.seed(100000),
      id: 0,
      firstName: faker.name.fullName(),
      middleName: faker.name.middleName(),
      lastName: faker.name.lastName(),
      occupation: faker.name.jobTitle(),
      telephone: faker.phone.number(),
      student: this.applicant,
      userRelation: UserRelation.PARENT,
    };

    this.applicationService.selectedApplication.subscribe(value => {
      if (value != null || value !== undefined)
        this.application = value;
      console.log('Application In App Details= ', value);
    }, error => {
      console.log('Error: ', error);
    }, () => {
    });

    indexOfS = Object.values(FamilyStatus).indexOf(FamilyStatus.NORMAL as unknown as FamilyStatus);
    indexOfS = Object.values(JoiningSecondaryOrContinuing)
      .indexOf(this.application.joiningSecondary.joiningSecondaryOrContinuing as unknown as
        JoiningSecondaryOrContinuing);
    this.joiningSecondaryOrContinuing = Object.keys(JoiningSecondaryOrContinuing)[indexOfS];
    indexOfS = Object.values(DayOrBoarder)
      .indexOf(this.application.joiningSecondary.dayOrBoarder as unknown as DayOrBoarder);
    this.dayOrBoarderChecked = Object.keys(DayOrBoarder)[indexOfS];
    indexOfS = Object.values(SchoolGrade)
      .indexOf(this.application.schoolVerification.grade as unknown as SchoolGrade);
    this.schoolGrade = Object.keys(SchoolGrade)[indexOfS];
    indexOfS = Object.values(SchoolStatus)
      .indexOf(this.applicant.school.schoolStatus as unknown as SchoolStatus);
    this.schoolStatus = Object.keys(SchoolStatus)[indexOfS];
    indexOfS = Object.values(FamilyStatus)
      .indexOf(this.applicant.studentRelation.familyStatus as unknown as FamilyStatus);
    this.familyStatus = Object.keys(FamilyStatus)[indexOfS];


    finalCommitteeDeclaration.application  = this.application;

    this.studentDetails = this.fb.group({
      county: [this.application.applicant !== null && this.application.applicant.county !== null ?
        this.initFormControl(this.application.applicant.county.id) : null,
        [Validators.required]],
      subCounty: [this.application.applicant !== null ?
        this.initFormControl(this.application.applicant.subCounty) : null, [Validators.required]],
      wardName: [this.application.applicant !== null ?
        this.initFormControl(this.application.applicant.wardName) : '', [Validators.required]],
      nimsNumber: [this.application.applicant !== null ?
        this.initFormControl(this.application.applicant.nemisNumber) : '',
        [Validators.minLength(1), Validators.required]],
      forNumber: [this.application.applicant !== null ?
        this.initFormControl(this.application.applicant.forNumber) : ''],
      idNumber: [this.application.applicant !== null ?
        this.initFormControl(this.application.applicant.id1) : ''],
    });
    // console.log('School= ', this.applicant.school );
    // console.log('School Bank Account= ', this.applicant.school.bankAccount);
    this.schoolDetails = this.fb.group({
      schoolName: [this.application.applicant !== undefined && this.application.applicant.school !== undefined ?
        this.initFormControl(this.application.applicant.school.schoolName) : '', [Validators.required]],
      schoolStatus: [ this.schoolStatus !== undefined
        ? this.initFormControl(this.schoolStatus) : '', [Validators.required]],
      schoolAccountNumber: [ this.application.applicant !== undefined && this.application.applicant.school !== undefined
      && this.application.applicant.school.bankAccount !== undefined ?
        this.initFormControl(this.application.applicant.school.bankAccount.accountNumber) : '',
        [Validators.required]],
      schoolAccountName: [this.application.applicant !== undefined && this.application.applicant.school !== undefined
      && this.application.applicant.school.bankAccount !== undefined ?
        this.initFormControl(this.application.applicant.school.bankAccount.accountName) : '', [Validators.required]],
      schoolAccountBankBranch: [ this.application.applicant !== undefined &&
      this.application.applicant.school !== undefined
      && this.application.applicant.school.bankAccount !== undefined ?
        this.initFormControl(this.application.applicant.school.bankAccount.accountBranch) : '',
        [Validators.required]],
    });
    for (let i = 0; i < 3; i++) {
      const document: Document = {
        application: this.application,
        dateUploaded: new Date(),
        fileName: faker.system.fileName(),
        filePath: faker.system.filePath(),
        fileType: faker.system.fileExt(),
        id: 0,
        remarks: faker.random.alphaNumeric(15),
        documentType: DocumentType.STUDENTS_BIRTH_CERTIFICATE,
        document: null};
      this.application.documents.push(document);
    }
    this.familyDetails = this.fb.group({
      parentOrGuardianName: [this.application.applicant !== undefined &&
      this.application.applicant.studentRelation !== undefined ?
        this.initFormControl(this.application.applicant.studentRelation.firstName) : '',
        [Validators.required]],
      parentOrGuardianOccupation: [this.application.applicant !== undefined ?
        this.initFormControl(this.application.applicant.occupation) : '', [Validators.required]],
      parentOrGuardianTelephone: [this.application.applicant !== undefined &&
      this.application.applicant.studentRelation !== undefined ?
        this.initFormControl(this.application.applicant.studentRelation.telephone) : '', [Validators.required]],
      familyStatus: [this.familyStatus !== undefined ?
        this.initFormControl(this.familyStatus) : '', [Validators.required]],
      grossIncomePerYear: [this.application.applicant !== undefined &&
      this.application.applicant.studentRelation !== undefined ?
        this.initFormControl(this.application.applicant.studentRelation.grossIncomePerYear) : '',
        [Validators.required]],
      familyIncomeDocuments: [this.initFormControl(this.application.documents[0])],
      birthCertificate: [this.initFormControl(this.application.documents[1])],
      otherStudentDocuments: [this.initFormControl(this.application.documents[2])],
    });


    this.joiningSecondaryDetails = this.fb.group({
      totalFees: [this.application.joiningSecondary !== undefined ?
        this.initFormControl(this.application.joiningSecondary.totalFees) : '', [Validators.min(0)]],
      benefitedFromFund: [this.application.joiningSecondary !== undefined ?
        this.initFormControl(this.application.joiningSecondary.benefitedFromFund) : ''],
      benefitedFromFundAmount: [this.application.joiningSecondary !== undefined ?
        this.initFormControl(this.application.joiningSecondary.benefitedFromFundAmount) : ''],
      dayOrBoarder: [this.dayOrBoarderChecked !== undefined ?
        this.initFormControl(this.dayOrBoarderChecked) : ''],
      outstandingBalance: [this.application.joiningSecondary !== undefined ?
        this.initFormControl(this.application.joiningSecondary.outstandingBalance) : ''],
    });
    this.schoolVerificationDetails = this.fb.group({
      academicYear: [ this.application.schoolVerification !== undefined ?
        this.initFormControl(this.application.schoolVerification.academicYear) : '',
        [Validators.min(1), Validators.max(8)]],
      position: [this.application.schoolVerification !== undefined ?
        this.initFormControl(this.application.schoolVerification.position) : ''],
      schoolGrade: [this.schoolGrade !== undefined ?
        this.initFormControl(this.schoolGrade) : ''],
      admissionLetter: [''],
      principalComment: ['', [this.principalsCommentValidation()]],
    });
    this.studentDeclaration = this.fb.group({
      studentDeclaration: ['', [Validators.requiredTrue]],
    });
    this.joiningSecondaryForm = this.fb.group({
      totalFees: [this.initFormControl(this.application.joiningSecondary.totalFees), [Validators.min(0)]],
      benefitedFromFund: [this.initFormControl(this.application.joiningSecondary.benefitedFromFund)],
      benefitedFromFundAmount: [this.initFormControl(this.application.joiningSecondary.benefitedFromFundAmount)],
      dayOrBoarder: [this.initFormControl(this.dayOrBoarderChecked)],
      outstandingBalance: [this.initFormControl(this.application.joiningSecondary.outstandingBalance)],
    });

    this.schoolVerificationForm = this.fb.group({
      academicYear: [ this.initFormControl(this.application.schoolVerification.academicYear),
        [Validators.min(1), Validators.max(8)]],
      position: [this.initFormControl(this.application.schoolVerification.position)],
      schoolGrade: [this.initFormControl(this.schoolGrade)],
      admissionLetter: [''],
      principalComment: ['', [this.principalsCommentValidation()]],
    });

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

      this.familyStatusesMap.set(value.value , value.key);
    });
    console.log('application.joiningSecondary.joiningSecondaryOrContinuing= ',
      this.application.joiningSecondary.joiningSecondaryOrContinuing);
    console.log('application.joiningSecondary.benefitedFromFund= ',
      this.application.joiningSecondary.benefitedFromFund === false);
    console.log('dayOrBoarderChecked= ', this.dayOrBoarderChecked);
    this.formInvalid = this.studentDetails.invalid;
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
      .indexOf(value as typeof
        enumeration);
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
    const student: Student = new Student();
    const family: StudentRelation = new StudentRelation();
    const school = new School();
    school.bankAccount = new BankAccount();
    student.school = school;
    student.county = new County();
    student.studentRelation = family;
    const joiningSecondary: JoiningSecondary = new JoiningSecondary();
    const schoolVerification: SchoolVerification = new SchoolVerification();
    const wardAdministrator: WardAdministrator = new WardAdministrator();
    const sd: FormGroup = this.studentDetails;
    const fd: FormGroup = this.familyDetails;
    const schd: FormGroup = this.schoolDetails;
    const jsd: FormGroup = this.joiningSecondaryDetails;
    const svd: FormGroup = this.schoolVerificationDetails;
    const decl: FormGroup = this.studentDeclaration;
    const wardCl: FormGroup = this.wardAdministratorForm;
    console.log('joiningSecondaryDetails= ', this.joiningSecondaryDetails);
    // const application: FormGroup = this.applicationForm;
    const documents: File[] = [];

    // Student details
    // student.county.id = sd.get('county').value;
    student.subCounty = sd.get('subCounty').value;
    student.wardName = sd.get('wardName').value;
    student.nemisNumber = sd.get('nimsNumber').value;
    student.forNumber = sd.get('forNumber').value;
    student.id1 = sd.get('idNumber').value;

    console.log('Student= ', student);

    family.firstName = fd.get('parentOrGuardianName').value;
    family.occupation = fd.get('parentOrGuardianOccupation').value;
    family.telephone = fd.get('parentOrGuardianTelephone').value;
    // family.familyStatus = fd.get('familyStatus').value;
    family.grossIncomePerYear = fd.get('grossIncomePerYear').value;
// console.log('fd.get(\'familyStatus\').value= ', fd.get('familyStatus').value);
    console.log('Family= ', family);


    // File
    school.schoolName = schd.get('schoolName').value;
    // school.schoolStatus = schd.get('schoolStatus').value;
    school.bankAccount.accountNumber = schd.get('schoolAccountNumber').value;
    school.bankAccount.accountName = schd.get('schoolAccountName').value;
    school.bankAccount.accountBranch = schd.get('schoolAccountBankBranch').value;

    console.log('school= ', school);
    joiningSecondary.totalFees = jsd.get('totalFees').value;
    joiningSecondary.benefitedFromFund = jsd.get('benefitedFromFund').value;
    joiningSecondary.benefitedFromFundAmount = jsd.get('benefitedFromFundAmount').value;
    joiningSecondary.dayOrBoarder = jsd.get('dayOrBoarder').value;
    joiningSecondary.outstandingBalance = jsd.get('outstandingBalance').value;
    joiningSecondary.joiningSecondaryOrContinuing = JoiningSecondaryOrContinuing[this.isJoiningSecondaryOrContinuing];
    // joiningSecondary.feesStructure = jsd.get('feesStructure').value;
    console.log('joiningSecondary= ', joiningSecondary);

    // wardAdministrator.familyStatusComment = wardCl.get('familyStatusComment').value;
    // wardAdministrator.name = wardCl.get('name').value;
    console.log('Ward Administrator= ', wardAdministrator);

    schoolVerification.academicYear = svd.get('academicYear').value;
    schoolVerification.position = svd.get('position').value;
    // schoolVerification.grade =  svd.get('schoolGrade').value;
    // schoolVerification.principalComment = svd.get('principalComment').value;
    console.log('schoolVerification= ', schoolVerification);
    // this.uploadFiles();
    console.log('isJoiningSecondaryOrContinuing= ', this.isJoiningSecondaryOrContinuing);
    const application: Application = new Application();
    application.applicant = student;
    application.applicationStatus = ApplicationStatus.PENDING;
    application.joiningSecondary = joiningSecondary;
    application.schoolVerification = schoolVerification;
    console.log('dayOrBoarderValue= ', this.dayOrBoarderValue);
    // this.applicationService.apply(application);
  }
  get studentDeclarationFormControl() {
    return this.studentDeclaration.controls;
  }
  get studentDetailsForm() {
    return this.studentDetails.controls;
  }
  get schoolVerificationDetailsForm() {
    return this.schoolVerificationDetails.controls;
  }
  get joiningSecondaryDetailsFormControl() {
    return this.joiningSecondaryDetails.controls;
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
}
