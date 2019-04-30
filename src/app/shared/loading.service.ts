import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class LoadingService {

    private loadingBehaviorSubject: BehaviorSubject<boolean>;
    isAppLoading$: Observable<boolean>;


    constructor() {
        this.loadingBehaviorSubject = new BehaviorSubject<boolean>(false);
        this.isAppLoading$ = this.loadingBehaviorSubject.asObservable();
    }

    setAppLoadingStatus(isLoading: boolean): void{
        this.loadingBehaviorSubject.next(isLoading);
    }


}
