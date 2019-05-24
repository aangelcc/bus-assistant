import { Component, OnInit, NgZone } from '@angular/core';
import { NlpService } from '../shared/nlp.service';
import { SpeechRecognitionService } from '../shared/speech-recognition.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

    response = {};

    readonly speechObservable: Observable<string>;

    speechResult = 'Resultado';

    constructor(private nlpService: NlpService, private speechRecognitionService: SpeechRecognitionService, private ngZone: NgZone) {
        this.speechObservable = speechRecognitionService.listenSpeech();
    }

    ngOnInit(): void {
        this.nlpService.getResponse('Dame los horarios para Antequera').subscribe(data => this.response = data);
    }

    startRecognition() {
        this.speechObservable.subscribe(result => {
            this.ngZone.run(() => {
                this.speechResult = result;
            });

            console.log('Received result: ' + result);
        },
            error => console.log('Error!'),
            () => console.log('completed'));
    }

}
