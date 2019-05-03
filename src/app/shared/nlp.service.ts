import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
export class NlpService {

  private readonly baseURL = 'https://api.dialogflow.com/v1/query?v=20150910';
  private readonly token = '53a234c4b1ec4117a84c028e207f06dd';

  constructor(private http: HttpClient) { }

  public getResponse(textQuery: string) {
    const data = {
      query : textQuery,
      lang: 'es',
      sessionId: '12345'
    };

    const httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        })};

    return this.http.post(`${this.baseURL}`, data, httpOptions);
  }
}
