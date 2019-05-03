import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from './model/destination';
import { destinationsEndpoint, destinationInfoEndpoint } from './constants';
import { DestinationInfo } from './model/destination-info';

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class InfoBusService {

    constructor(private http: HttpClient) { }

    retrieveAllDestinations(): Observable<Destination[]> {
        return this.http.get<Destination[]>(destinationsEndpoint);
    }

    retrieveDestinationInfo(destinationId: number): Observable<DestinationInfo> {
        return this.http.get<DestinationInfo>(destinationInfoEndpoint + `?id=${destinationId}&publico=1`);
    }

    retrieveDestinationNameFromStringId(destinationId: string): Observable<string> {
        return this.retrieveAllDestinations().pipe(map(data => this.filterFunction(data, destinationId)));
    }

    private filterFunction(destinationArray: Destination[], destinationId: string): string {
        const foundDestinationName = destinationArray.find(destination => destination.id_parada === destinationId);

        return foundDestinationName ? foundDestinationName.Ruta : '?';
    }
}
