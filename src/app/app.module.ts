/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './navigation/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbAlertModule, NbButtonModule,
  NbCardModule,
  NbChatModule, NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule, NbIconModule, NbInputModule,
  NbMenuModule, NbRadioModule, NbSelectModule,
  NbSidebarModule, NbStepperModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {ApplicationComponent} from './application/application.component';
import {LoginComponent} from './components/login/login.component';
import {NbAuthModule, NbPasswordAuthStrategy, NbTokenLocalStorage, NbTokenStorage} from '@nebular/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './components/register/register.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {ProfileComponent} from './components/profile/profile.component';
import {HomeComponent} from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApplyingComponent } from './components/applying/applying.component';
import { GuidelinesComponent } from './components/guidelines/guidelines.component';
import { MyApplicationsComponent } from './components/my-applications/my-applications.component';
import { StatusComponent } from './components/status/status.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { ManagerComponent } from './components/my-applications/manager/manager.component';
import { OfficialsComponent } from './components/my-applications/officials/officials.component';
import { AdminComponent } from './components/my-applications/admin/admin.component';
import {MatTableModule} from '@angular/material/table';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { AppDetailsStudentComponent } from './components/application-details/app-details-student/app-details-student.component';
import { AppDetailsAdminComponent } from './components/application-details/app-details-admin/app-details-admin.component';
import { AppDetailsManagerComponent } from './components/application-details/app-details-manager/app-details-manager.component';
import { AppDetailsComponent } from './components/application-details/app-details/app-details.component';

@NgModule({
  declarations: [AppComponent,
    ApplicationComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    NavComponent,
    FooterComponent,
    ApplyingComponent,
    GuidelinesComponent,
    MyApplicationsComponent,
    StatusComponent,
    ManagerComponent,
    OfficialsComponent,
    AdminComponent,
    AppDetailsStudentComponent,
    AppDetailsAdminComponent,
    AppDetailsManagerComponent,
    AppDetailsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbCardModule,
    NbStepperModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbCheckboxModule,
    FormsModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbRadioModule,
    NbSelectModule,
    MatRadioModule,
    MatSelectModule,
    NgbModule,
    Ng2SmartTableModule,
    MatTableModule,
    MatSliderModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
  providers: [{provide: NbTokenStorage, useClass: NbTokenLocalStorage}],
  bootstrap:
    [AppComponent],
})

export class AppModule {
}
