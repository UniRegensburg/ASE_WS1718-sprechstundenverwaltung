import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficehoursDialogComponent } from './officehours-dialog/officehours-dialog.component';
import { DialogsService } from './dialogs.service';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [OfficehoursDialogComponent],
  exports: [OfficehoursDialogComponent],
  entryComponents: [OfficehoursDialogComponent],
  providers: [DialogsService]
})
export class DialogsModule { }
