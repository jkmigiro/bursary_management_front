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
    GuidelinesComponent],
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
  ],
  providers: [{provide: NbTokenStorage, useClass: NbTokenLocalStorage}],
  bootstrap:
    [AppComponent],
})

export class AppModule {
}
