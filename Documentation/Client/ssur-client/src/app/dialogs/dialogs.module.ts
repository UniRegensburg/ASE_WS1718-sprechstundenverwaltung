import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficehoursProfDialogComponent } from './officehours-prof-dialog/officehours-prof-dialog.component';
import { DialogsService } from './dialogs.service';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [OfficehoursProfDialogComponent],
  exports: [OfficehoursProfDialogComponent],
  entryComponents: [OfficehoursProfDialogComponent],
  providers: [DialogsService]
})
export class DialogsModule { }
