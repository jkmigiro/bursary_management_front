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
import {ThemeModule} from './@theme/theme.module';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [AppComponent, ApplicationComponent, LoginComponent, RegisterComponent],
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
        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',
                    baseEndpoint: '',
                    login: {
                        // ...
                        endpoint: '/api/auth/login',
                    },
                    register: {
                        // ...
                        endpoint: '/api/auth/register',
                    }
                })
            ],
            forms: {
                login: {
                    redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
                    strategy: 'email',  // strategy id key.
                    rememberMe: true,   // whether to show or not the `rememberMe` checkbox
                    showMessages: {     // show/not show success/error messages
                        success: true,
                        error: true,
                    },
                    validation: {
                        password: {
                            required: false,
                            minLength: 4,
                            maxLength: 50,
                        },
                        email: {
                            required: false,
                        },
                        fullName: {
                            required: false,
                            minLength: 4,
                            maxLength: 50,
                        },
                    }
                    // socialLinks: socialLinks, // social links at the bottom of a page
                },

            },
        }),
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
        MatSelectModule
    ],
  providers: [{provide: NbTokenStorage, useClass: NbTokenLocalStorage}],
  bootstrap:
    [AppComponent],
})

export class AppModule {
}
