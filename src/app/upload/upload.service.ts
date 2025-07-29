import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';//HTTP communication
import { map } from 'rxjs/operators'; //Transforms the emitted response in the pipe.
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'; //Observable for asynchronous operations and throwError for error handling

@Injectable({
  providedIn: 'root'
})
export class Upload {
SERVER_URL: string = 'http://localhost:5222/';
  constructor(private httpClient: HttpClient) { }
public upload(data: FormData): Observable<any> {
  const UploadURL = `${this.SERVER_URL}Uploads`;

  const authUser = localStorage.getItem('authUser');
  const token = authUser ? JSON.parse(authUser).token : null;

  return this.httpClient.post<any>(UploadURL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    reportProgress: true,
    observe: 'events'
  });
}


}
