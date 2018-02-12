import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { OfficehoursProfDialogComponent } from './officehours-prof-dialog/officehours-prof-dialog.component';
import { OfficehoursStudentDialogComponent } from './officehours-student-dialog/officehours-student-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  // Opens dialog to create officehour as prof
  public  createOfficeHourDialog(title: string):  Observable<boolean> {
    let dialogRef: MatDialogRef<OfficehoursProfDialogComponent>;
    dialogRef = this.dialog.open(OfficehoursProfDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.confirmButton = 'Anlegen';

    return dialogRef.afterClosed();
  }

  // Opens dialog to edit officehour as prof
  public editOfficeHourDialog(title: string, dateTime: any, slotSize: number, slotAmount: number): Observable<boolean> {
    let dialogRef: MatDialogRef<OfficehoursProfDialogComponent>;
    dialogRef = this.dialog.open(OfficehoursProfDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.selectedDateTime = dateTime;
    dialogRef.componentInstance.slotSize = slotSize;
    dialogRef.componentInstance.slotAmount = slotAmount;
    dialogRef.componentInstance.confirmButton = 'Editieren';

    return dialogRef.afterClosed();
  }

  // Opens Dialog to register for officehour as student
  public registerOfficeHourDialog(header: string): Observable<boolean> {
    let dialogRef: MatDialogRef<OfficehoursStudentDialogComponent>;
    dialogRef = this.dialog.open(OfficehoursStudentDialogComponent);
    dialogRef.componentInstance.header = header;
    dialogRef.componentInstance.confirmButton = 'Belegen';
    dialogRef.componentInstance.showDeleteButton = false;
    return dialogRef.afterClosed();
  }

  // Opens Dialog to edit registered officehour as student
  public editRegisteredOfficeHourDialog(header: string, title: string, body: string): Observable<boolean> {
    let dialogRef: MatDialogRef<OfficehoursStudentDialogComponent>;
    dialogRef = this.dialog.open(OfficehoursStudentDialogComponent);
    dialogRef.componentInstance.header = header;
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.body = body;
    dialogRef.componentInstance.confirmButton = 'Editieren';
    dialogRef.componentInstance.showDeleteButton = true;
    return dialogRef.afterClosed();
  }

}
