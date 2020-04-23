import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

interface AnyObject {
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl = isDevMode() ? '/api' : 'https://theatreapi.saileshkumar.com';
  baseOptions = { withCredentials: true };
  constructor(private http: HttpClient) {}

  get(url: string, options?: AnyObject) {
    const httpParams = this.constructParams(options);
    return this.http.get(`${this.baseUrl}/${url}`, {
      ...this.baseOptions,
      params: httpParams as HttpParams,
    });
  }

  post(url: string, options?: AnyObject) {
    const httpParams = this.constructParams(options, 'POST');
    return this.http.post(`${this.baseUrl}/${url}`, httpParams, {
      ...this.baseOptions,
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }

  constructParams(options: AnyObject, method: 'GET' | 'POST' = 'GET') {
    let httpParams = new HttpParams();
    for (const property in options) {
      if (options.hasOwnProperty(property)) {
        httpParams = httpParams.set(property, options[property]);
      }
    }
    return method === 'POST' ? httpParams.toString() : httpParams;
  }
}
