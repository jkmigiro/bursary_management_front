import {Component, OnInit} from '@angular/core';
import {NbMenuService} from '@nebular/theme';
import {User} from '../models/user.model';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DayOrBoarder} from '../enums/day-or-boarding.enum';
import {JoiningSecondaryOrContinuing} from '../enums/joining-secondary-or-continuing.enum';
import {SchoolGrade} from '../enums/school-grade.enum';
import {County} from '../models/county.model';
import {FamilyStatus} from '../enums/family-status.enum';
import {SchoolStatus} from '../enums/school-status.enum';
import {Student} from '../models/student.model';
import {StudentRelation} from '../models/student-relation.model';
import {Observable} from 'rxjs';
import {FileUploadService} from '../services/file-upload.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {School} from '../models/school.model';
import {JoiningSecondary} from '../models/joining-secondary.model';
import {SchoolVerification} from '../models/school-verification.model';
import {BankAccount} from '../models/bank-account.model';
import {faker} from '@faker-js/faker';
import {ApplicationConstants} from '../constants/application.constants';
import {Application} from '../models/application.model';
import {ApplicationStatus} from '../enums/application-status.enum';
import {ApplicationService} from '../services/application-service.service';
import {WardAdministrator} from '../models/ward-administrator.model';
import {Document} from '../models/document.model';
import {UserRelation} from '../enums/user-relation.enum';

@Component({
  selector: 'ngx-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {

  dayOrBoarderValues: string[] = Object.values(DayOrBoarder);
  dayOrBoarderKeys: string[] = Object.keys(DayOrBoarder);
  isJoiningSecondaryOrContinuing: string;
  hasBenefitedFromFund: boolean;
  joiningSecondaryOrContinuingKeys: string[] = Object.keys(JoiningSecondaryOrContinuing);
  joiningSecondaryOrContinuingValues: string[] = Object.values(JoiningSecondaryOrContinuing);
  schoolGrades = ApplicationConstants.SCHOOL_GRADE;
  familyStatuses = ApplicationConstants.FAMILY_STATUS;
  schoolStatuses = ApplicationConstants.SCHOOL_STATUS;
  dayOrBoarder = ApplicationConstants.DAY_OR_BOARDER;
  schoolGradeKeys: string[] = Object.keys(SchoolGrade);
  schoolGradeValues: string[] = Object.values(SchoolGrade);
  familyStatusKeys: string[] = Object.keys(FamilyStatus);
  familyStatusValues: string[] = Object.values(FamilyStatus);
  schoolStatusKeys: string[] = Object.keys(SchoolStatus);
  schoolStatusValues: string[] = Object.values(SchoolStatus);
  counties: County[] = ApplicationConstants.COUNTIES;
  otherDocuments: FileList;
  studentDocuments: File[] = [];
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;
  documents: Map<string, File> = new Map();
  joining: string;
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  JOINING_OR_CONTINUING = ApplicationConstants.JOINING_OR_CONTINUING;
// User will be logged in student
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  addressForm: FormGroup;
  studentDetails: FormGroup;
  familyDetails: FormGroup;
  schoolDetails: FormGroup;
  joiningSecondaryDetails: FormGroup;
  schoolVerificationDetails: FormGroup;
  studentDeclaration: FormGroup;
  applicationForm: FormGroup;
  wardAdministratorForm: FormGroup;

  constructor(private fb: FormBuilder,
              private menuService: NbMenuService,
              private fileUploadService: FileUploadService,
              private applicationService: ApplicationService) {
    // @ts-ignore
    // super();
  }

  get studentDetailsForm(): { [p: string]: AbstractControl } {
    return this.studentDetails.controls;
  }

  get familyDetailsForm(): { [p: string]: AbstractControl } {
    return this.familyDetails.controls;
  }

  get schoolDetailsForm(): { [p: string]: AbstractControl } {
    return this.schoolDetails.controls;
  }

  get schoolVerificationDetailsForm(): { [p: string]: AbstractControl } {
    return this.schoolVerificationDetails.controls;
  }

  get studentDeclarationForm(): { [p: string]: AbstractControl } {
    return this.studentDeclaration.controls;
  }

  get joiningSecondaryDetailsForm(): { [p: string]: AbstractControl } {
    return this.joiningSecondaryDetails.controls;
  }

  get studentDeclarationFormControl() {
    return this.studentDeclaration.controls;
  }

  goToHome() {
    this.menuService.navigateHome();
    const user: User = new User();
    user.username = 'Admin';
  }

  ngOnInit() {
    this.fileInfos = this.fileUploadService.getFiles();
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.studentDetails = this.fb.group({
      county: ['', [Validators.required]],
      subCounty: ['', [Validators.required]],
      wardName: ['', [Validators.required]],
      nimsNumber: ['', [Validators.required, Validators.minLength(1)]],
      forNumber: [''],
      idNumber: [''],
    });

    this.familyDetails = this.fb.group({
      parentOrGuardianFirstName: ['', [Validators.required]],
      parentOrGuardianMiddleName: [''],
      parentOrGuardianLastName: ['', [Validators.required]],
      parentOrGuardianOccupation: [''],
      parentOrGuardianTelephone: ['', [Validators.required]],
      familyStatus: ['', [Validators.requiredTrue]],
      grossIncomePerYear: ['', [Validators.pattern(/^[0-9]\d*$/),
        Validators.min(1)]],
      familyIncomeDocuments: [''],
      birthCertificate: ['', [Validators.required]],
      otherStudentDocuments: [''],
      userRelation: ['', [Validators.required]],
    });

    this.schoolDetails = this.fb.group({
      schoolName: ['', [Validators.required]],
      schoolStatus: ['', [Validators.requiredTrue]],
      schoolAccountNumber: ['', [Validators.required]],
      schoolAccountName: ['', [Validators.required]],
      schoolAccountBankBranch: ['', [Validators.required]],
    });

    this.joiningSecondaryDetails = this.fb.group({
      totalFees: ['', [Validators.pattern(/^[0-9]\d*$/),
        Validators.min(1)]],
      benefitedFromFund: ['', Validators.required],
      benefitedFromFundAmount: ['', [this.benefitedFromFundAmountValidation(), Validators.pattern(/^[0-9]\d*$/),
        Validators.min(1),
      ]],
      dayOrBoarder: ['', [Validators.required]],
      outstandingBalance: ['', [Validators.pattern(/^[0-9]\d*$/)]],
      feesStructure: ['', [Validators.required]],
      joiningSecondaryOrContinuing: ['', [Validators.required]],
    });

    this.schoolVerificationDetails = this.fb.group({
      academicYear: ['', [this.continuingValidation(),
        Validators.pattern(/^[0-9]\d*$/), Validators.min(1)]],
      position: ['', [this.continuingValidation(), Validators.pattern(/^[0-9]\d*$/),
      , Validators.min(1)]],
      schoolGrade: ['', [this.continuingValidation()]],
      studentNumber: ['', this.continuingValidation()],
      admissionLetter: ['', [this.joiningSecondaryValidation()]],
      principalComment: [''],
    });

    this.applicationForm = this.fb.group({
      studentDetails: this.studentDetails,
    });

    this.studentDeclaration = this.fb.group({
      studentDeclaration: ['', [Validators.requiredTrue]],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });

    this.wardAdministratorForm = this.fb.group({
      id: [''],
      familyStatusComment: [''],
      name: [''],
    });
    this.initCounties();
  }

  onWardAdministratorSubmit() {
    this.wardAdministratorForm.markAsDirty();
  }

  onStudentDetailsSubmit() {
    this.studentDetails.markAsDirty();

  }

  onFamilyDetailsSubmit() {
    this.familyDetails.markAsDirty();
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

  changeJoiningSecondary(value): void {
    this.isJoiningSecondaryOrContinuing = value;
    console.log('Value: ', value);
    console.log('isJoiningSecondaryOrContinuing: ', this.isJoiningSecondaryOrContinuing);
  }

  changeBenefitedFromSecondary($event) {
    this.hasBenefitedFromFund = $event.target.value;
  }

  applicationSubmit() {
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
    // const application: FormGroup = this.applicationForm;
    const documents: File[] = [];

    // Student details
    student.county.id = sd.get('county').value;
    student.subCounty = sd.get('subCounty').value;
    student.wardName = sd.get('wardName').value;
    student.nemisNumber = sd.get('nimsNumber').value;
    student.forNumber = null;
    student.id1 = null;
    student.studentDeclaration = decl.get('studentDeclaration').value;
    student.studentNumber = svd.get('studentNumber').value;

    console.log('Student= ', student);

    family.firstName = fd.get('parentOrGuardianFirstName').value;
    family.middleName = fd.get('parentOrGuardianMiddleName').value;
    family.lastName = fd.get('parentOrGuardianLastName').value;
    family.occupation = fd.get('parentOrGuardianOccupation').value;
    family.telephone = fd.get('parentOrGuardianTelephone').value;
    family.familyStatus = fd.get('familyStatus').value;
    family.grossIncomePerYear = fd.get('grossIncomePerYear').value;
    family.userRelation = fd.get('userRelation').value;

    console.log('Family= ', family);

    // File
    school.schoolName = schd.get('schoolName').value;
    school.schoolStatus = schd.get('schoolStatus').value;
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
    joiningSecondary.feesStructure = jsd.get('feesStructure').value;
    console.log('joiningSecondary= ', joiningSecondary);

   // wardAdministrator.familyStatusComment = wardCl.get('familyStatusComment').value;
   // wardAdministrator.name = wardCl.get('name').value;
    console.log('Ward Administrator= ', wardAdministrator);

    schoolVerification.academicYear = svd.get('academicYear').value;
    schoolVerification.position = svd.get('position').value;
    schoolVerification.grade =  svd.get('schoolGrade').value;
    // schoolVerification.principalComment = svd.get('principalComment').value;
    console.log('schoolVerification= ', schoolVerification);
    console.log('isJoiningSecondaryOrContinuing= ', this.isJoiningSecondaryOrContinuing);
    const application: Application = new Application();
    application.applicant = student;
    application.applicationStatus = this.getEnumKeyFromValue(ApplicationStatus, ApplicationStatus.PENDING);
    application.joiningSecondary = joiningSecondary;
    application.schoolVerification = schoolVerification;
    application.documents = [];
    this.documents.forEach((value, key) => {
      const doc: Document = new Document();
      doc.document = value;
      application.documents.push(doc);
    });
    console.log('Documents= ', this.documents.size);
    this.applicationService.apply(application);
  }

  // Next we define selectFiles() method. It helps us to get the selected Files that we’re gonna upload.
  excessFiles: boolean;
  sizeOfSelectedFiles: number = 0;
  selectFiles(event): void {
    this.progressInfos = [];
    this.otherDocuments = event.target.files;
    // const fileList: FileList;

    if (event.target.files.length <= 5) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.documents.set(file.name, file);
        console.log('Files selected= ', file);
        this.sizeOfSelectedFiles = file.size + this.sizeOfSelectedFiles;
      }
    } else {
      this.excessFiles = true;
    }
    this.sizeOfSelectedFiles = this.sizeOfSelectedFiles / (9.537 * 10 ^ -7);

    console.log('Event file uploaded: ', event.target.files, ' size= ', this.sizeOfSelectedFiles);
  }

  selectFile(event, key): void {
    // this.studentDocuments.push(event.target.files[0]);
    this.documents.set(key, event.target.files[0]);
    console.log('Event file uploaded: ', event.target.files[0], ' length: ', this.studentDocuments.length);
    console.log('Documents Map ', this.documents.size);
  }

  // Next we define upload() method for uploading each file:
  upload(idx, file) {
    this.progressInfos[idx] = {value: 0, fileName: file.name};
    this.fileUploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.fileUploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }


  // Now we iterate over the selected Files above and call upload() method on each file item.
  uploadFiles() {
    this.message = '';

    if (this.studentDocuments.length > 0)
      console.log('Files uploaded length:', this.studentDocuments.length);

    console.log('Map size while uploading: ', this.documents.size);
    this.documents.forEach((value, key) => {
      console.log('Key= ', key, 'value= ', value);
      this.studentDocuments.push(value);
    });
    console.log('this.otherDocuments= ', this.otherDocuments);
    if (this.otherDocuments !== undefined && null) {
      for (let i = 0; i < this.otherDocuments.length; i++) {
        this.studentDocuments.push(this.otherDocuments[i]);
        console.log('Other Documents added: ', this.otherDocuments[i]);
      }
    }
    console.log('this.studentDocuments= ', this.studentDocuments);
    for (let i = 0; i < this.studentDocuments.length; i++) {
      console.log('File Name= ', this.studentDocuments[i]);
      // this.upload(i, this.studentDocuments[i]);
    }
  }

  initCounties(): void {
  }

  populateWithDummy(): void {
    const student = {
      county: 47,
      subCounty: faker.random.alphaNumeric(20),
      wardName: faker.name.jobArea(),
      nimsNumber: faker.seed(),
      forNumber: faker.seed(),
      idNumber: faker.seed(),
    };
    const family = {
      parentOrGuardianName: faker.name.fullName(),
      parentOrGuardianTelephone: faker.phone.number(),
      parentOrGuardianOccupation: faker.name.jobTitle(),
      familyStatus: 'NEEDY',
      grossIncomePerYear: faker.seed(),
      familyIncomeDocuments: '',
      birthCertificate: '',
      otherStudentDocuments: '',
      userRelation: this.getEnumKeyFromValue(UserRelation, UserRelation.PARENT),
    };

    const school = {
      schoolName: faker.random.alphaNumeric(),
      schoolAccountNumber: faker.finance.account(),
      schoolAccountName: faker.finance.accountName(),
      schoolStatus: 'NATIONAL',
      schoolAccountBankBranch: faker.finance.creditCardIssuer(),
    };
    const joiningSecondary = {
      totalFees: faker.seed(100000),
      benefitedFromFund: faker.datatype.boolean(),
      benefitedFromFundAmount: faker.seed(100000),
      dayOrBoarder: 'BOARDER',
      outstandingBalance: faker.seed(50000),
      feesStructure: null,
      joiningSecondaryOrContinuing:
        this.getEnumKeyFromValue(JoiningSecondaryOrContinuing, JoiningSecondaryOrContinuing.CONTINUING),
    };
    const schoolVerification = {
      academicYear: faker.seed(12),
      position: faker.seed(500),
      schoolGrade: 'A',
      principalComment: faker.random.alphaNumeric(100),
      admissionLetter: '',
      studentNumber: 1,
    };
    this.studentDetails.setValue(student);
    this.familyDetails.setValue(family);
    this.schoolDetails.setValue(school);
    this.joiningSecondaryDetails.setValue(joiningSecondary);
    this.schoolVerificationDetails.setValue(schoolVerification);
    console.log(this.getEnumKeyFromValue(UserRelation, UserRelation.PARENT), ' : ' ,
      this.getEnumKeyFromValue(JoiningSecondaryOrContinuing, JoiningSecondaryOrContinuing.CONTINUING));
  }

  getEnumKeyFromValue(enumeration, value): any {
    let indexOfS: any;
    if (enumeration !== undefined && value !== undefined) {
      indexOfS = Object.values(enumeration)
        .indexOf(value as typeof enumeration);
      return Object.keys(enumeration)[indexOfS];
    }
  }

  getValueFromEnum(enumeration: any, valueToFind: string): any {
    Object.keys(enumeration).forEach((value, key) => {
      if (value === valueToFind)
        return value;
    });
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

}
