import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  EventResolver
} from './events/index';

import { AuthService } from './user/auth.service';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import {JQ_TOKEN, TOASTR_TOKEN, Toastr, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective} from './common/index';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { UserModule } from './user/user.module';

const toastr: Toastr = window['toastr'];
const JQuery = window['$'];


@NgModule({
  declarations: [
    EventsAppComponent,
    EventDetailsComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    UpvoteComponent,
    DurationPipe,
    ModalTriggerDirective,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    EventService,
    EventListResolver,
    VoterService,
    AuthService,
    EventResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: JQuery
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  } else {
    return true;
  }
}
