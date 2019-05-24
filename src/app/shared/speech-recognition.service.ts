import { Injectable } from '@angular/core';

import { SpeechNotification } from './model/speech-notification';
import { SpeechError } from './model/speech-error';
import { AppWindow } from './model/app-window';
import { Observable } from 'rxjs';

const { webkitSpeechRecognition }: AppWindow = window as AppWindow;

@Injectable({
    providedIn: 'root',
})
export class SpeechRecognitionService {

    private speechRecognition: any = null;

    private speechResultsObservable: Observable<string>;


    public checkSpeechRecognitionSupportForWebkit(): boolean {
        return window.hasOwnProperty('webkitSpeechRecognition');
    }

    public setSpeechRecognitionLanguage(language: string) {
        this.speechRecognition.lang = language;
    }

    public listenSpeech(): Observable<string> {
        this.initSpeechRecognition();
        this.speechResultsObservable = new Observable(observer => {

            // Register handlers before starting recognition
            this.speechRecognition.onstart = () => {
                console.log('[Service] Recognition started');
            }

            this.speechRecognition.onend = () => {
                console.log('[Service] Speech recognition ended');
                observer.complete();
            }

            this.speechRecognition.onresult = (event) => {
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                console.log('[Service] Result is...' + finalTranscript);

                observer.next(finalTranscript);
            }

            this.speechRecognition.onerror = (event) => {
                console.log('[Service] Ooops... an error happened while recognizing voice...' + JSON.stringify(event));
            }

            this.startRecognition();

            return {unsubscribe() {}};
        });

        return this.speechResultsObservable;
    }

    private initSpeechRecognition(): void {
        this.speechRecognition = new webkitSpeechRecognition();
        this.speechRecognition.continuous = false;
        this.speechRecognition.interimResults = false;
        this.speechRecognition.lang = 'es-ES';
    }

    private startRecognition(): void {
        this.speechRecognition.start();
    }

}
