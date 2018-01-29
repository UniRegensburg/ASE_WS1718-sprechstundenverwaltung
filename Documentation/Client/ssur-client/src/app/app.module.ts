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
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';


import { AppComponent } from './app.component';
import { ProfessorSelectorComponent } from './professor-selector/professor-selector.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarContentComponent } from './sidebar/sidebar-content/sidebar-content.component';
import { OfficehoursDialogComponent } from './dialogs/officehours-dialog/officehours-dialog.component';
import {DialogsService} from './dialogs/dialogs.service';




@NgModule({
  declarations: [
    AppComponent,
    ProfessorSelectorComponent,
    SidebarComponent,
    SidebarContentComponent,
    OfficehoursDialogComponent
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
    MatNativeDateModule
  ],
  providers: [ProfessorService, DialogsService],
  bootstrap: [AppComponent],
  entryComponents: [OfficehoursDialogComponent]
})
export class AppModule { }
