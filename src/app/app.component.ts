import { Component } from '@angular/core';
import { LoadingService } from './shared/loading.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('500ms', style({opacity: 0}))
        ])
      ]
    )
  ],
})
export class AppComponent {
  title = 'bus-assistant';

  constructor(private loadingService: LoadingService) { }

  toggleLoading(value: boolean): void{
    this.loadingService.setAppLoadingStatus(value);
  }

}
