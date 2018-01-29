import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { OfficehoursDialogComponent } from './officehours-dialog/officehours-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public  openDialog():  Observable<boolean> {

    let dialogRef: MatDialogRef<OfficehoursDialogComponent>;

    dialogRef = this.dialog.open(OfficehoursDialogComponent);

    return dialogRef.afterClosed();
  }

  /* adjust for officehours editing
  public edit(title: string, message: string): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
   */

}
