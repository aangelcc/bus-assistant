import { Component, Input, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { LoadingService } from '../shared/loading.service';
import { DestinationInfo } from '../shared/model/destination-info';
import { InfoBusService } from '../shared/info-bus.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bus-schedule',
    templateUrl: './bus-schedule.component.html',
    styleUrls: ['./bus-schedule.component.css'],
})
export class BusScheduleComponent implements OnChanges, OnDestroy {

    @Input() routeId: string;

    destinationInfo: DestinationInfo;

    destinationName = '?';

    dataFetchingFailed = false;

    private busScheduleSubscription: any;

    constructor(private loadingService: LoadingService, private infoBusService: InfoBusService, private router: Router) {
        this.routeId = '';
        this.destinationInfo = null;
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {

        for (const propName in changes) {

            if (changes.hasOwnProperty(propName)) {
                if (propName === 'routeId') {
                    const changedProp = changes[propName];
                    const propValue = changedProp.currentValue;

                    if (propValue && propValue !== '') {
                    this.updateRouteInfo(propValue);
                    this.updateRouteName(propValue);
                    }
                }
            }
        }
    }

    ngOnDestroy(): void {
        if (this.busScheduleSubscription != null) {
            this.busScheduleSubscription.unsubscribe();
        }
    }

    updateRouteInfo(routeId: string) {
        this.loadingService.setAppLoadingStatus(true);
        this.busScheduleSubscription = this.infoBusService.retrieveDestinationInfo(Number.parseInt(routeId, 10))
        .subscribe((data: DestinationInfo) => {
            this.loadingService.setAppLoadingStatus(false);
            this.destinationInfo = data;

            if (!data || (!data.datosIda && !data.datosVuelta)) {
                this.dataFetchingFailed = true;
            }
        },
        error => {
            console.log('Oh vaya! Error obteniendo información...');
            this.loadingService.setAppLoadingStatus(false);
            this.dataFetchingFailed = true;
        }
        );
    }

    private updateRouteName(routeId: string) {
        this.infoBusService.retrieveDestinationNameFromStringId(routeId).subscribe((data: string) => {
            this.destinationName = data;
        }, error => { this.dataFetchingFailed = true; });
    }

    private goHome(): void {
        this.router.navigate(['/welcome']);
    }
}
