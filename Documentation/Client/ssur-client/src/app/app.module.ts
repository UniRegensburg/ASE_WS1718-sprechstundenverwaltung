import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {
  MatAutocompleteModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material';
import { MatInputModule} from '@angular/material';
import { MatSlideToggleModule} from '@angular/material';
import { HttpClientModule} from '@angular/common/http';
import { ProfessorService} from './services/ProfessorService';
import {HttpModule} from '@angular/http';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { ScheduleService} from './services/ScheduleService';
import { CalendarModule} from 'ap-angular2-fullcalendar';


import { AppComponent } from './app.component';
import { ProfessorSelectorComponent } from './professor-selector/professor-selector.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarContentProfComponent } from './sidebar/sidebar-content-prof/sidebar-content-prof.component';
import { OfficehoursProfDialogComponent } from './dialogs/officehours-prof-dialog/officehours-prof-dialog.component';
import {DialogsService} from './dialogs/dialogs.service';
import {OfficehoursService} from './services/Officehours.service';
import { MainCalComponent } from './main-cal/main-cal.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfessorSelectorComponent,
    SidebarComponent,
    SidebarContentProfComponent,
    OfficehoursProfDialogComponent,
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
    MatDialogModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSelectModule,
    MatDividerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule
  ],
  providers: [ProfessorService, ScheduleService,
    DialogsService,
    OfficehoursService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'de'}],
  bootstrap: [AppComponent],
  entryComponents: [OfficehoursProfDialogComponent]
})
export class AppModule { }
