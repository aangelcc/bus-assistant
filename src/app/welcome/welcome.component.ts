import { Component, OnInit } from '@angular/core';
import { NlpService } from '../shared/nlp.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

    response = {};

    constructor(private nlpService: NlpService) { }

    ngOnInit(): void {
        this.nlpService.getResponse('Dame los horarios para Antequera').subscribe(data => this.response = data);
    }

}
