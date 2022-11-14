import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationConstants} from '../../constants/application.constants';
import {ApplicationService} from '../../services/application-service.service';
import {User} from '../../models/user.model';
import {NbDialogService} from '@nebular/theme';
import {DialogComponent} from '../dialog/dialog.component';
import {ReportRequest} from '../../models/report-request.model';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {

  applicationStatusForm: FormGroup;
  schoolStatusForm: FormGroup;
  applicationStatuses = ApplicationConstants.APPLICATION_STATUS;
  user: User;
  constructor(private fb: FormBuilder,
              private applicationService: ApplicationService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.applicationStatusForm = this.fb.group({
      applicationStatus: ['', Validators.required],
    });
    this.applicationService.user.subscribe(value => {
      this.user = value;
    }, error => {
      this.dialogService.open(DialogComponent, {
        context: {
          title: 'Error',
          info: 'Error occurred ' + error,
        },
      });
    });
    console.log('User ID= ', this.user.id);
  }

  get applicationStatusFormControls() {
    return this.applicationStatusForm.controls;
  }

  applicationStatusSubmit() {
    if (this.applicationStatusForm.valid) {
      console.log('Console log. Application Status report is being generated... ');
      const reportRequest: ReportRequest = new ReportRequest();
      reportRequest.reportName = 'application_status';
      reportRequest.id = this.user.id;
      reportRequest.applicationStatus = this.applicationStatusForm.get('applicationStatus').value;
      this.applicationService.getReport(reportRequest)
        .subscribe((blob: any) => {
          const a = document.createElement('a');
          new Blob([blob.body], { type: 'application/pdf' });
          a.href = URL.createObjectURL(blob.body);
          a.download = 'application_status_report.pdf';
          console.log('File name= ', blob.headers.get('Content-Disposition'));
          a.click();
        }, (error: any) => {
          console.log('Error generating Application Status report: ', error);
          this.dialogService.open(DialogComponent, {
            context: {
              title: 'Error',
              info: 'There was an error generating your report ' + error,
            },
          });
        }, () => {
          console.log('Successfully generated report');
        });
    } else {
      this.dialogService.open(DialogComponent, {
        context: {
          title: 'Error',
          info: 'Correct errors in your submission',
        },
      });
    }
  }

  countiesSubmit() {
    const reportRequest: ReportRequest = new ReportRequest();
    reportRequest.reportName = 'counties';
    reportRequest.id = null;
    reportRequest.applicationStatus = null;
    this.applicationService.getReport(reportRequest)
      .subscribe(blob => {
        const a = document.createElement('a');
        new Blob([blob.body], { type: 'application/pdf' });
        a.href = URL.createObjectURL(blob.body);
        a.download = 'counties_report.pdf';
        console.log('File name= ', blob.headers.get('Content-Disposition'));
        a.click();
      }, error => {
        console.log('Error generating Counties report: ', error);
        this.dialogService.open(DialogComponent, {
          context: {
            title: 'Error',
            info: 'There was an error generating your report ' + error,
          },
        });
      }, () => {
        console.log('Successfully generated report');
      });
  }
  schoolStatusSubmit() {
    const reportRequest: ReportRequest = new ReportRequest();
    reportRequest.reportName = 'school_status';
    reportRequest.id = this.user.id;
    console.log('Report Request= ', JSON.stringify(reportRequest));
    this.applicationService.getReport(reportRequest)
      .subscribe(blob => {
        const a = document.createElement('a');
        new Blob([blob.body], { type: 'application/pdf' });
        a.href = URL.createObjectURL(blob.body);
        a.download = 'school_status_report.pdf';
        console.log('File name= ', blob.headers.get('Content-Disposition'));
        a.click();
      }, error => {
        console.log('Error generating School Status report: ', error);
        this.dialogService.open(DialogComponent, {
          context: {
            title: 'Error',
            info: 'There was an error generating your report ' + error,
          },
        });
      }, () => {
        console.log('Successfully generated report');
      });
  }
}
