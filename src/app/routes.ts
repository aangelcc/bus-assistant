import { Routes } from '@angular/router';
import { BusInfoComponent } from './bus-info/bus-info.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const appRoutes: Routes = [
    { path: 'route/:id', component: BusInfoComponent },
    {
      path: 'welcome',
      component: WelcomeComponent
    },
    { path: '',
      redirectTo: '/welcome',
      pathMatch: 'full'
    },
    { path: '**', redirectTo: '/welcome' }
  ];
