import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BusScheduleComponent } from './bus-schedule/bus-schedule.component';
import { BusInfoComponent } from './bus-info/bus-info.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    BusScheduleComponent,
    BusInfoComponent,
    WelcomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
