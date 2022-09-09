import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Application} from '../models/application.model';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ApplicationConstants} from '../constants/application.constants';
import {Country} from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {



  constructor(private http: HttpClient) { }

  apply(application: Application) {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', ' http://localhost:4200/')
      .set('authorization', 'Basic ' + btoa('user' + ':' + 'password'));


    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Access-Control-Allow-Origin', ' http://localhost:4200/'),
    // };
    // Access-Control-Allow-Origin
    console.log('Application= ', application);
    this.http.post<Application>(ApplicationConstants.URL + '/application' , application, {headers})
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

}
