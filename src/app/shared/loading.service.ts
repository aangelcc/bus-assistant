import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class LoadingService {

    private loadingBehaviorSubject: BehaviorSubject<boolean>;
    isAppLoading$: Observable<boolean>;


    constructor() {
        this.loadingBehaviorSubject = new BehaviorSubject<boolean>(false);
        this.isAppLoading$ = this.loadingBehaviorSubject.asObservable().pipe(delay(0));
    }

    setAppLoadingStatus(isLoading: boolean): void {
        this.loadingBehaviorSubject.next(isLoading);
    }


}
