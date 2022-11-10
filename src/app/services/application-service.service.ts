import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Application} from '../models/application.model';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {ApplicationConstants} from '../constants/application.constants';
import {Country} from '../models/country.model';
import {User} from '../models/user.model';
import {Role} from '../models/role.model';
import {Bank} from '../models/bank.model';
import {BankAccount} from '../models/bank-account.model';
import {faker} from '@faker-js/faker';
import {School} from '../models/school.model';
import {SchoolStatus} from '../enums/school-status.enum';
import {Gender} from '../enums/gender.enum';
import {UserStatus} from '../enums/user-status.enum';
import {Users} from '../enums/users.enum';
import {JoiningSecondary} from '../models/joining-secondary.model';
import {JoiningSecondaryOrContinuing} from '../enums/joining-secondary-or-continuing.enum';
import {DayOrBoarder} from '../enums/day-or-boarding.enum';
import {SchoolVerification} from '../models/school-verification.model';
import {SchoolGrade} from '../enums/school-grade.enum';
import {FinalCommitteeDeclaration} from '../models/final-committee-declaration.model';
import {ApplicationStatus} from '../enums/application-status.enum';
import {FamilyStatus} from '../enums/family-status.enum';
import {Student} from '../models/student.model';
import {Router} from '@angular/router';
import {UserRelation} from '../enums/user-relation.enum';


@Injectable({
  providedIn: 'root',
})
export class ApplicationService {

  url = ApplicationConstants.URL;
  private userSubject: BehaviorSubject<User>;
  private loggedInSubject: BehaviorSubject<boolean>;
  public user: Observable<User>;
  public loggedIn: Observable<boolean>;
  private selectedApplicationSubject: BehaviorSubject<Application>;
  selectedApplication: Observable<Application>;
  roleNameSubject: BehaviorSubject<string []>;
  roleNames: Observable< string[]>;
  applicant: Student;
  application: Application;
  constructor(private http: HttpClient,
              private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')),
    );
    this.user = this.userSubject.asObservable();
    this.loggedInSubject = new BehaviorSubject<boolean>(false);
    this.loggedIn = this.loggedInSubject.asObservable();
    this.selectedApplicationSubject = new BehaviorSubject<Application>(new Application());
    this.selectedApplication = this.selectedApplicationSubject.asObservable();
    this.roleNameSubject = new BehaviorSubject<string[]>([]);
    this.roleNames = this.roleNameSubject.asObservable();
    this.initApplication();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }
  // handleResponse(next: (value: any) => void , response: (error) => void, complete: () => void ) {
  //   next.apply(this.)
  //   return complete();
  // }
  register(user: User) {
    const formData = new FormData();
    console.log('User Photo= ', user.photo);
    formData.append('photo', user.photo);
    formData.append('user', new Blob([JSON.stringify(user)], {
      type: 'application/json',
    }));
    const headers: HttpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', ' http://localhost:4200/');

    this.http.post<User>(this.url + '/auth/register' , formData, {headers})
      .pipe()
      .subscribe(
        (val) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          this.roleNameSubject.next(user.roles.map(value => value.roleName));
          console.log('POST call successful value returned in body',
            val);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        });
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.url + '/auth/login', { email, password })
      .pipe(
        map((user: User) => {
          // const user: User = new User();
          // user.email = email;
          // user.password = password;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          this.loggedInSubject.next(true);
          this.roleNameSubject.next(user.roles.map(value => value.roleName));
          console.log('User after login in= ', user);
          return user;
        }),
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigate(['/home']);
    // this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/home']);
    // });
  }
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }

  apply(application: Application) {
    const formData = new FormData();
    console.log('Documents= ', application.documents);
    const files: File[] = [];
    if (application.documents !== undefined) {
      console.log('In If posting application= ', formData.get('applicationDocuments'));
      application.documents.forEach(value => formData.append('applicationDocuments', value.document));
    } else {

      formData.append('applicationDocuments', null);
      console.log('In else posting application= ', formData.get('applicationDocuments'));
    }
    formData.append('application', new Blob([JSON.stringify(application)], {
      type: 'application/json',
    }));

    // const headers: HttpHeaders = new HttpHeaders()
    //   .set('Access-Control-Allow-Origin', ' http://localhost:4200/')
    //   .set('authorization', 'Basic ' + btoa('user' + ':' + 'password'));


    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Access-Control-Allow-Origin', ' http://localhost:4200/'),
    // };
    // Access-Control-Allow-Origin
    console.log('Application= ', application);
    this.http.post<Application>(this.url + '/application' , formData)
      .pipe()
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body',
            val);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getCountries(): void {
    this.http.get<Country[]>(ApplicationConstants.URL + '/countries').subscribe(
      (val) => {
        console.log('Get call successful value returned in body',
          val);
      },
      response => {
        console.log('POST call in error', response);
      },
      () => {
        console.log('The POST observable is now completed.');
      });
  }

  updateSelectedApplication(application: any): void {
    console.log('Application: ', application);
    this.selectedApplicationSubject.next(application);
  }
  initApplication(): void {
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
      firstName: faker.name.firstName(),
      middleName: faker.name.middleName(),
      lastName: faker.name.lastName(),
      occupation: faker.name.jobTitle(),
      telephone: faker.phone.number(),
      student: this.applicant,
      userRelation: UserRelation.PARENT,
    };
    this.selectedApplicationSubject.next(this.application);
  }

}
