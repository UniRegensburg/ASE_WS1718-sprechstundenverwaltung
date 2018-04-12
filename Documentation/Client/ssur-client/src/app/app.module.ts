import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {
  MatAutocompleteModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatNativeDateModule,
  MatSelectModule, MatButtonModule, MatSlideToggleModule, MatInputModule, MatFormFieldModule
} from '@angular/material';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ProfessorService} from './services/ProfessorService';
import { HttpModule } from '@angular/http';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ScheduleService} from './services/ScheduleService';
import { CalendarModule} from 'ap-angular2-fullcalendar';
import { AppComponent } from './app.component';
import { ProfessorSelectorComponent } from './professor-selector/professor-selector.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarContentProfComponent } from './sidebar/sidebar-content-prof/sidebar-content-prof.component';
import { OfficehoursProfDialogComponent } from './dialogs/officehours-prof-dialog/officehours-prof-dialog.component';
import { DialogsService } from './dialogs/dialogs.service';
import { OfficehoursService } from './services/Officehours.service';
import { MainCalComponent } from './main-cal/main-cal.component';
import { OfficehoursStudentDialogComponent } from './dialogs/officehours-student-dialog/officehours-student-dialog.component';
import { SidebarContentStudentComponent } from './sidebar/sidebar-content-student/sidebar-content-student.component';
import { NotesComponent } from './notes/notes.component';
import { NotesDialogComponent } from './dialogs/notes-dialog/notes-dialog.component';
import { UserService } from './services/UserService';
import { MeetingsService } from './services/Meetings.service';
import { FullCalendarModule } from 'ng-fullcalendar';
import { SlotDetailsDialogComponent } from './dialogs/slot-details-dialog/slot-details-dialog.component';
import {NotesService} from './services/notes.service';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfessorSelectorComponent,
    SidebarComponent,
    SidebarContentProfComponent,
    OfficehoursProfDialogComponent,
    MainCalComponent,
    OfficehoursStudentDialogComponent,
    SidebarContentStudentComponent,
    MainCalComponent,
    NotesComponent,
    NotesDialogComponent,
    SlotDetailsDialogComponent,
    LoginComponent
  ],
  imports: [
    FullCalendarModule,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule
  ],
  providers: [
    ProfessorService,
    ScheduleService,
    DialogsService,
    OfficehoursService,
    UserService,
    MeetingsService,
    NotesService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'de'}],
  bootstrap: [AppComponent],

  entryComponents: [OfficehoursProfDialogComponent, OfficehoursStudentDialogComponent, NotesDialogComponent, SlotDetailsDialogComponent]

})
export class AppModule { }
