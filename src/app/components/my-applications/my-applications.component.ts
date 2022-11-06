import {Component, OnInit} from '@angular/core';
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
  applications: Application[] = [];
  user: User;
  data = [
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      passed: 'Yes',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      passed: 'No',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      email: 'Karley_Dach@jasper.info',
      passed: 'Yes',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      email: 'Telly.Hoeger@billy.biz',
      passed: 'No',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      email: 'Sherwood@rosamond.me',
      passed: 'Yes',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      email: 'Chaim_McDermott@dana.io',
      passed: 'No',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      email: 'Rey.Padberg@karina.biz',
      passed: 'No',
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      email: 'Rey.Padberg@rosamond.biz',
      passed: 'Yes',
    },
  ];
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
      passed: {
        title: 'Passed',
        type: 'Date',
        filter: {
          type: 'checkbox',
          config: {
            true: 'Yes',
            false: 'No',
            resetText: 'clear',
          },
        },
        // passed: {
        //   title: 'Date Applied',
        //   type: 'Date',
        // },
        // age: {
        //   title: 'Age',
        //   type: 'number',
        // },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
              private applicationService: ApplicationService,
              private router: Router) {
    const data = this.service.getData();
    // this.data = this.service.getData();
    this.source.load(data);
     this.applicationService.user.subscribe(next => {
       this.user = next;
    }, error => {

    }, () => {

    });

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

      const address: Address = {
        address1: faker.address.streetAddress(true),
        address2: null,
        country: new Country(),
        county: new County(),
        subCounty: faker.address.county(),
        wardName: faker.address.cityName(),
        postalCode: faker.address.secondaryAddress(),
        zipCode: faker.address.zipCode(),
      };

      const joiningSecondary: JoiningSecondary = {
        benefittedFromFund: false,
        benefittedFromFundAmount: faker.seed(),
        dayOrBoarder: DayOrBoarder.BOARDER,
        feesStructure: null,
        id: 0,
        joiningSecondaryOrContinuing: JoiningSecondaryOrContinuing.CONTINUING,
        outstandingBalance: faker.seed(),
        totalFees: faker.seed(),
      };

      const schoolVerification: SchoolVerification = {
        academicYear: faker.seed(12),
        admissionLetter: null,
        grade: SchoolGrade.C_PLAIN,
        id: 0,
        joiningSecondaryOrContinuing: JoiningSecondaryOrContinuing.CONTINUING,
        position: 0,
        principalComment: 'Good boy.',
      };

      const finalCommitteeDeclaration: FinalCommitteeDeclaration = {
        bursaryAwarded: 0,
        fundAdminSign: undefined,
        fundChairmanSign: undefined,
        id: 0,
        isApproved: false,
        reasons: '',
      };
      const student: Student = {
        addresses: [address],
        county: undefined,
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
        nimsNumber: '123456789',
        occupation: 'SOFTWARE ENGINEER',
        password: 'pass',
        photo: null,
        roles: [role],
        school: new School(),
        status: 'A',
        studentRelation: undefined,
        subCounty: 'Nairobi',
        telephone: faker.phone.number(),
        userRelations: [],
        userType: Users.STUDENT,
        username: 'jkmigiro',
        wardName: 'Nairobi',

      };
      const application: Application = {
        amountAwarded: 0,
        applicant: student,
        applicationDate: faker.date.recent(),
        applicationStatus: ApplicationStatus.PENDING,
        documents: [],
        doneBy: undefined,
        finalCommitteeDeclaration: finalCommitteeDeclaration,
        id: faker.seed(100),
        joiningSecondary: joiningSecondary,
        reasons: '',
        reviewedBy: null,
        reviewedDate: null,
        schoolVerification: schoolVerification,
        type: '',
        wardAdministrator: null,
      };
      this.applications.push(application);
    }
  }

  ngOnInit(): void {
    this.dataSource = ELEMENT_DATA;
    this.populateDummyData();
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.testDisplayedColumns = this.testColumns.map(c => c.columnDef);
  }

  onEdit(event): void {
    console.log('Event: ', event.data.id);
    const application = this.applications.find(((value, index) => value.id = event.data.id));
    this.applicationService.updateSelectedApplication(application);
    this.router.navigate(['applications', event.data.id]);
  }

}
