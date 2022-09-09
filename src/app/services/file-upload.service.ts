import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
