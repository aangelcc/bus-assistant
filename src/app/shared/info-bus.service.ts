import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from './model/destination';
import { destinationsEndpoint, destinationInfoEndpoint } from './constants';
import { DestinationInfo } from './model/destination-info';

@Injectable({
    providedIn: 'root',
  })
  export class InfoBusService {

    constructor(private http: HttpClient) { }

    retrieveAllDestinations(): Observable<Destination[]> {
        return this.http.get<Destination[]>(destinationsEndpoint);
    }

    retrieveDestinationInfo(destinationId: Number): Observable<DestinationInfo> {
        return this.http.get<DestinationInfo>(destinationInfoEndpoint + `?id=${destinationId}&publico=1`);
    }

}
