import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { OfficehoursProfDialogComponent } from './officehours-prof-dialog/officehours-prof-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public  createOfficeHourDialog(title: string):  Observable<boolean> {

    let dialogRef: MatDialogRef<OfficehoursProfDialogComponent>;

    dialogRef = this.dialog.open(OfficehoursProfDialogComponent);

    dialogRef.componentInstance.title = title;

    return dialogRef.afterClosed();
  }



  public editOfficeHourDialog(title: string, dateTime: any, slotSize: number, slotAmount: number): Observable<boolean> {

    let dialogRef: MatDialogRef<OfficehoursProfDialogComponent>;

    dialogRef = this.dialog.open(OfficehoursProfDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.selectedDateTime = dateTime;
    dialogRef.componentInstance.slotSize = slotSize;
    dialogRef.componentInstance.slotAmount = slotAmount;

    return dialogRef.afterClosed();
  }

}
