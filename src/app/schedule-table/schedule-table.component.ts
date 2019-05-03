import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { Expedition } from '../shared/model/expedition';

@Component({
    selector: 'app-schedule-table',
    templateUrl: './schedule-table.component.html',
    styleUrls: ['./schedule-table.component.css'],
})
export class ScheduleTableComponent implements OnChanges {

    @Input() expeditions: Expedition[];

    constructor() {
        this.expeditions = null;
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {

        for (const propName in changes) {

            if (changes.hasOwnProperty(propName)) {
                if (propName === 'expeditions') {
                    const changedProp = changes[propName];
                    const propValue = changedProp.currentValue;

                    if (propValue) {
                        this.expeditions = propValue;
                    }
                }
            }
        }
    }
}
