import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-bus-info',
    templateUrl: './bus-info.component.html',
    styleUrls: ['./bus-info.component.css'],
})
export class BusInfoComponent implements OnInit{

    routeId: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.routeId = this.route.snapshot.paramMap.get('id');
      }


}
