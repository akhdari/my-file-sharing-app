import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:5222/Uploads';

  constructor(private http: HttpClient) {}

private getAuthHeaders(): HttpHeaders {
  let token = '';
  const authUserStr = localStorage.getItem('authUser');

  if (authUserStr) {
    try {
      const authUser = JSON.parse(authUserStr);
      token = authUser.token || '';
    } catch (e) {
      console.error('Failed to parse authUser:', e);
    }
  }

  return new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
}


  upload(files: File[]): Observable<HttpEvent<any>> {
    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }

    const req = new HttpRequest('POST', this.baseUrl, formData, {
      reportProgress: true,
      headers: this.getAuthHeaders()
    });

    return this.http.request(req);
  }

  getSharedFiles(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/shared/${token}`, {
      headers: this.getAuthHeaders()
    });
  }
}
