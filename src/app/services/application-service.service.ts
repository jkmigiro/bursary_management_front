import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Application} from '../models/application.model';
import {catchError, map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {ApplicationConstants} from '../constants/application.constants';
import {Country} from '../models/country.model';
import {User} from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class ApplicationService {

  url = ApplicationConstants.URL;
  private userSubject: BehaviorSubject<User>;
  private loggedInSubject: BehaviorSubject<boolean>;
  public user: Observable<User>;
  public loggedIn: Observable<boolean>;
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')),
    );
    this.user = this.userSubject.asObservable();
    this.loggedInSubject = new BehaviorSubject<boolean>(false);
    this.loggedIn = this.loggedInSubject.asObservable();
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

  login(email: string, password: string) {
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
          console.log('User after login in= ', user);
          return user;
        }),
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }

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
    this.http.post<Application>(this.url + '/application' , application, {headers})
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
