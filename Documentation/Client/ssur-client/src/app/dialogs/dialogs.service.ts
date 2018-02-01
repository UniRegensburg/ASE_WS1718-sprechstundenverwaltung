import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { OfficehoursDialogComponent } from './officehours-dialog/officehours-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public  openDialog(title: string):  Observable<boolean> {

    let dialogRef: MatDialogRef<OfficehoursDialogComponent>;

    dialogRef = this.dialog.open(OfficehoursDialogComponent);

    dialogRef.componentInstance.title = title;

    return dialogRef.afterClosed();
  }



  public editDialog(title: string, dateTime: any, slotSize: number, slotAmount: number): Observable<boolean> {

    let dialogRef: MatDialogRef<OfficehoursDialogComponent>;

    dialogRef = this.dialog.open(OfficehoursDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.selectedDateTime = dateTime;
    dialogRef.componentInstance.slotSize = slotSize;
    dialogRef.componentInstance.slotAmount = slotAmount;

    return dialogRef.afterClosed();
  }

}
