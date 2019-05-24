import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { destinationsEndpoint } from './constants';
import { Destination } from './model/destination';
import { InfoBusService } from './info-bus.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class NlpService {

  private readonly baseURL = 'https://api.dialogflow.com/v1/query?v=20150910';
  private readonly token = '53a234c4b1ec4117a84c028e207f06dd';

  constructor(private http: HttpClient, private infoBusService: InfoBusService) { }

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

  public destinationStringIdFromRecognizedDestinationName(recognizedCityName: string): Observable<string> {
    return this.infoBusService.retrieveAllDestinations().
    pipe(map(destinations => this.findDestinationIdFromRecognizedCityName(destinations, recognizedCityName)));
  }


  private findDestinationIdFromRecognizedCityName(destinations: Destination[], recognizedDestinationName: string) {
    const foundDestination = destinations.find(destination => this.checkFoundDestination(destination.Ruta, recognizedDestinationName));
    // Find returns undefined if it doens't find any destination
    const destinationStringId = foundDestination ? foundDestination.id_parada : '';

    return destinationStringId;
  }

  private checkFoundDestination(originalDestinationName: string, recognizedDestinationName: string): boolean {
    return originalDestinationName.toLowerCase().includes(recognizedDestinationName.toLocaleLowerCase());
  }
}
