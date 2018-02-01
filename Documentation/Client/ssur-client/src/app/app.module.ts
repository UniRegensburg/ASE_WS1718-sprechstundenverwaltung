import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { MatAutocompleteModule} from '@angular/material';
import { ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material';
import { MatInputModule} from '@angular/material';
import { MatSlideToggleModule} from '@angular/material';
import { HttpClientModule} from '@angular/common/http';
import { ProfessorService} from './services/ProfessorService';
import { ScheduleService} from './services/ScheduleService';
import {HttpModule} from '@angular/http';
import { CalendarModule} from 'ap-angular2-fullcalendar';


import { AppComponent } from './app.component';
import { ProfessorSelectorComponent } from './professor-selector/professor-selector.component';
import { MainCalComponent } from './main-cal/main-cal.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfessorSelectorComponent,
    MainCalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    HttpClientModule,
    HttpModule,
    CalendarModule
  ],
  providers: [ProfessorService, ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
