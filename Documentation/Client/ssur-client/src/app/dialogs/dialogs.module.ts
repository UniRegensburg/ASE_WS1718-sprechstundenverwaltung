import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficehoursProfDialogComponent } from './officehours-prof-dialog/officehours-prof-dialog.component';
import { OfficehoursStudentDialogComponent } from './officehours-student-dialog/officehours-student-dialog.component';
import { DialogsService } from './dialogs.service';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [OfficehoursProfDialogComponent, OfficehoursStudentDialogComponent],
  exports: [OfficehoursProfDialogComponent, OfficehoursStudentDialogComponent],
  entryComponents: [OfficehoursProfDialogComponent, OfficehoursStudentDialogComponent],
  providers: [DialogsService]
})
export class DialogsModule { }
