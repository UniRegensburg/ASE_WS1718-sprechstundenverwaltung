import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { MatAutocompleteModule} from "@angular/material";
import { ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule} from "@angular/material";
import { MatInputModule} from "@angular/material";
import { MatSlideToggleModule} from "@angular/material";
import { HttpClientModule} from "@angular/common/http";
import { ProfessorService} from "./services/ProfessorService";
import {HttpModule} from "@angular/http";


import { AppComponent } from './app.component';
import { ProfessorSelectorComponent } from './professor-selector/professor-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfessorSelectorComponent
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
    HttpModule
  ],
  providers: [ProfessorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
