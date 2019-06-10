import { Component, OnInit, NgZone } from '@angular/core';
import { NlpService } from '../shared/nlp.service';
import { SpeechRecognitionService } from '../shared/speech-recognition.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

    response = {};

    readonly speechObservable: Observable<string>;

    speechResult = 'Resultado';

    constructor(private nlpService: NlpService, private speechRecognitionService: SpeechRecognitionService, private ngZone: NgZone, private router: Router,) {
        this.speechObservable = speechRecognitionService.listenSpeech();
    }

    ngOnInit(): void {
        this.nlpService.getResponse('Dame los horarios para Antequera').subscribe(data => this.response = data);
    }

    startRecognition() {

        let fullSubscription = this.speechObservable.pipe(
            mergeMap(recognition => this.nlpService.getResponse(recognition)),
            map(recognitionResult => {
                let recognizedName = '';

                if (recognitionResult.hasOwnProperty('result') && recognitionResult['result'].hasOwnProperty('parameters') && recognitionResult['result']['parameters'].hasOwnProperty('CiudadEstabus')) {
                    recognizedName = recognitionResult['result']['parameters']['CiudadEstabus'];
                }
                console.log('Desde el map: '+recognizedName);
                return recognizedName;
            }));
            // mergeMap(geoCity => this.nlpService.destinationStringIdFromRecognizedDestinationName(geoCity)));

        fullSubscription.subscribe(result => {
            this.ngZone.run(() => {
                this.speechResult = result;
                this.router.navigate(['/route/' + result]);
            });

            // console.log('Received result: ' + result);
        },
            error => console.log('Error!'),
            () => console.log('completed'));;
    }

}
