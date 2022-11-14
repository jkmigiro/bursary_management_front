import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../@core/data/smart-table';
import {ApplicationService} from '../../services/application-service.service';
import {User} from '../../models/user.model';
import {Application} from '../../models/application.model';
import {faker} from '@faker-js/faker';
import {Gender} from '../../enums/gender.enum';
import {Users} from '../../enums/users.enum';
import {Role} from '../../models/role.model';
import {Student} from '../../models/student.model';
import {Address} from '../../models/address.model';
import {Country} from '../../models/country.model';
import {County} from '../../models/county.model';
import {School} from '../../models/school.model';
import {ApplicationStatus} from '../../enums/application-status.enum';
import {JoiningSecondary} from '../../models/joining-secondary.model';
import {DayOrBoarder} from '../../enums/day-or-boarding.enum';
import {JoiningSecondaryOrContinuing} from '../../enums/joining-secondary-or-continuing.enum';
import {SchoolVerification} from '../../models/school-verification.model';
import {SchoolGrade} from '../../enums/school-grade.enum';
import {FinalCommitteeDeclaration} from '../../models/final-committee-declaration.model';
import {Router} from '@angular/router';
import {UserStatus} from '../../enums/user-status.enum';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'ngx-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss'],
})
export class MyApplicationsComponent implements OnInit {
  applications: any[] = [];
  application: Application;
  user: User;
  roleNames: string [];
  data = [];
  columns = [
    {
      columnDef: 'id',
      header: 'Id',
      cell: (element: Application) => `${element.id}`,
    },
    {
      columnDef: 'applicant',
      header: 'Applicant',
      cell: (element: Application) => `${element.applicant.email}`,
    },
    {
      columnDef: 'applicationDate',
      header: 'Application Date',
      cell: (element: Application) => `${element.applicationDate}`,
    },
    {
      columnDef: 'applicationStatus',
      header: 'Application Status',
      cell: (element: Application) => `${element.applicationStatus}`,
    },
  ];

  testColumns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: PeriodicElement) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: PeriodicElement) => `${element.name}`,
    },
    {
      columnDef: 'weight',
      header: 'Weight',
      cell: (element: PeriodicElement) => `${element.weight}`,
    },
    {
      columnDef: 'symbol',
      header: 'Symbol',
      cell: (element: PeriodicElement) => `${element.symbol}`,
    },
  ];

  dataSource = ELEMENT_DATA;
  displayedColumns: any;
  testDisplayedColumns: any;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    actions: {
      add: false,
      delete: false,
    },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      // confirmDelete: true,
    },
    mode: 'external',
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        sort: true,
      },
      name: {
        title: 'Name',
        type: 'string',
        sort: true,
      },
      email: {
        title: 'Email',
        type: 'string',
        sort: true,
        // filter: {
        //   type: 'completer',
        //   config: {
        //     completer: {
        //       data: this.data,
        //       searchFields: 'email',
        //       titleField: 'email',
        //     },
        //   },
        // },
      },
      applicationStatus: {
        title: 'Status',
        type: 'string',
        sort: true,
      },
      applicationDate: {
        title: 'Application Date',
        type: 'date',
        sort: true,
      },
      // passed: {
      //   title: 'Passed',
      //   type: 'Date',
      //   filter: {
      //     type: 'checkbox',
      //     config: {
      //       true: 'Yes',
      //       false: 'No',
      //       resetText: 'clear',
      //     },
      //   },
      //   // passed: {
      //   //   title: 'Date Applied',
      //   //   type: 'Date',
      //   // },
      //   // age: {
      //   //   title: 'Age',
      //   //   type: 'number',
      //   // },
      // },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
              private applicationService: ApplicationService,
              private router: Router) {
    const data = this.service.getData();
    // this.data = this.service.getData();
    this.applicationService.roleNames.subscribe(next => {
      this.roleNames = next;
    }, error => {

    }, () => {

    });

  }

  checkRole(roles: string[] | string): boolean {
    // call your api to get user/account DTo for your current logged in user
    // call your api to get user/account DTo for your current logged in user
    // change yourAccount with your variable
    // role/roles with your property having the role value
    // if you have single role check, convert it to array
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    // let say you have user.roles as Array strings in your table, then do
    return this.roleNames.some((role: string) => roles.includes(role));
    // let say you have single role in your Db
    // return   roles.include(yourAccount.role);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  populateDummyData(): void {

    for (let i = 0; i < 20; i++) {
      const role = new Role();
      role.roleName = 'USER';

      const county = new County();
      county.id = 1;

      const address: Address = {
        address1: faker.address.streetAddress(true),
        address2: null,
        country: new Country(),
        county: county,
        subCounty: faker.address.county(),
        wardName: faker.address.cityName(),
        postalCode: faker.address.secondaryAddress(),
        zipCode: faker.address.zipCode(),
      };

      const joiningSecondary: JoiningSecondary = {
        benefitedFromFund: false,
        benefitedFromFundAmount: faker.seed(),
        dayOrBoarder: DayOrBoarder.BOARDER,
        feesStructure: null,
        id: 0,
        joiningSecondaryOrContinuing: JoiningSecondaryOrContinuing.CONTINUING,
        outstandingBalance: faker.seed(),
        totalFees: faker.seed(),
        application: this.application,
      };

      const schoolVerification: SchoolVerification = {
        academicYear: faker.seed(12),
        admissionLetter: null,
        grade: SchoolGrade.C_PLAIN,
        id: 0,
        position: 0,
        principalComment: 'Good boy.',
        application: this.application,
      };
      const wardAdministrator: User = new  User();
      wardAdministrator.firstName = faker.name.firstName();
      wardAdministrator.middleName  = faker.name.middleName();
      wardAdministrator.lastName = faker.name.lastName();
      const finalCommitteeDeclaration: FinalCommitteeDeclaration = {
        bursaryAwarded: 0,
        fundAdminSign: undefined,
        fundChairmanSign: undefined,
        id: 0,
        isApproved: false,
        reasons: '',
        application: null,
        familyStatusComment: faker.random.alphaNumeric(20),
        wardAdministrator: wardAdministrator,
      };
      const student: Student = {
        addresses: [address],
        county: county,
        dateJoined: faker.date.recent(),
        dateOfBirth: faker.date.birthdate(),
        deleted: false,
        email: 'jkmigiro@gmail.com',
        firstName: 'Jasper',
        forNumber: 123,
        gender: Gender.M,
        id: 0,
        id1: 0,
        lastName: faker.name.lastName(),
        middleName: faker.name.middleName(),
        nemisNumber: '123456789',
        occupation: 'SOFTWARE ENGINEER',
        password: 'pass',
        photo: null,
        roles: [role],
        school: new School(),
        status: UserStatus.A,
        subCounty: 'Nairobi',
        telephone: faker.phone.number(),
        userRelations: [],
        userType: Users.STUDENT,
        username: 'jkmigiro',
        wardName: 'Nairobi',
        studentNumber: 1,
        studentDeclaration: true,
      };
      // id, applicant - email, name - concat, status, date
      const application = {
        amountAwarded: 0,
        applicant: student,
        applicationDate: faker.date.recent().toDateString(),
        applicationStatus: ApplicationStatus.PENDING, // yes
        documents: [],
        doneBy: undefined,
        finalCommitteeDeclaration: finalCommitteeDeclaration,
        id: faker.datatype.number(100),
        joiningSecondary: joiningSecondary,
        reasons: '',
        reviewedBy: null,
        reviewedDate: null,
        schoolVerification: schoolVerification,
        type: '',
        name: student.firstName.trim().concat(' ', student.middleName.trim(), ' ', student.lastName).trim(),
        email: student.email,
        // wardAdministrator: null,
      };
      this.applications.push(application);
      this.data.push(application);
    }
  }

  ngOnInit(): void {
    this.dataSource = ELEMENT_DATA;
    // this.populateDummyData();
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.testDisplayedColumns = this.testColumns.map(c => c.columnDef);
    this.applicationService.user.subscribe((value => {
      this.user = value;
      console.log('User in MyApplications= ', value);
    }), (error => {
      console.error('An error has occurred: ', error);
    }), () => {
      console.log('Completed');
    });
    // this.applicationService.selectedApplication.subscribe( (value => {
    //   this.application = value;
    //   console.log('Application= ', this.application);
    // }), error => {
    //   console.log('Error= ', error);
    // }, () => {
    //   console.log('Complete');
    // });
    this.applicationService.getApplicationsByUserId().subscribe(
      value => {
        if ( value !== null) {
          this.applications = value;
          value.forEach(value1 => {
            console.log('App data... ', value1);
            const app: any = {};
            app.id = value1.id;
            app.name = value1.applicant.firstName.trim().concat(' ', value1.applicant.middleName.trim(),
              ' ', value1.applicant.lastName).trim();
            app.email = value1.applicant.email;
            app.applicationStatus = value1.applicationStatus;
            app.applicationDate = new Date(value1.applicationDate).toLocaleDateString('en-GB');
            console.log('App= ', app, ' Faker Date= ', faker.date.recent());
            this.data.push(app);
          });
        }
        this.source.load(this.data);
      }, error => {
        console.log('Error occurred getting applications by userId: ', error);
      }, () => console.log('Successfully got applications by userID'),
    );
    const val = this.user.roles.map(value => value.roleName);
    this.checkRole(val);
  }

  onEdit(event): void {
    console.log('Event: ', event.data.id);
    const application = this.applications.find(((value, index) => value.id = event.data.id));

    if (application !== undefined ) {
      this.applicationService.updateSelectedApplication(application);
      console.log('On Edit= ', application);
      // console.log('School= ', application.applicant.school );
      // console.log('School Bank Account= ', application.applicant.school.bankAccount);
      this.router.navigate(['applications', event.data.id]);
    }
    console.log('Application= ', application);
  }

}
