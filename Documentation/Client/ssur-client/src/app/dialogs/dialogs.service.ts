import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OfficehoursProfDialogComponent } from './officehours-prof-dialog/officehours-prof-dialog.component';
import { OfficehoursStudentDialogComponent } from './officehours-student-dialog/officehours-student-dialog.component';
import { SlotDetailsDialogComponent } from './slot-details-dialog/slot-details-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import * as moment from 'moment';

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

  // Opens dialog to see slotdetails and start conversation as prof
  public showSlotDetails(start: any, title: string, description: string, id: string) {
    let dialogRef: MatDialogRef<SlotDetailsDialogComponent>;
    dialogRef = this.dialog.open(SlotDetailsDialogComponent);
    dialogRef.componentInstance.startDateTime = moment(start).format('DD.MM.YYYY, HH:mm');
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.description = description;
    dialogRef.componentInstance.studentID = id;
    dialogRef.componentInstance.getStudentName(id);
    return dialogRef.afterClosed();
  }

  // Opens Dialog to register for officehour as student
  public registerOfficeHourDialog(header: string, meetingID: string): Observable<boolean> {
    let dialogRef: MatDialogRef<OfficehoursStudentDialogComponent>;
    dialogRef = this.dialog.open(OfficehoursStudentDialogComponent);
    dialogRef.componentInstance.header = header;
    dialogRef.componentInstance.meetingID = meetingID;
    dialogRef.componentInstance.editSlot = false;
    return dialogRef.afterClosed();
  }

  // Opens Dialog to edit registered officehour as student
  public editRegisteredOfficeHourDialog(header: string, title: string, description: string, id: string): Observable<boolean> {
    let dialogRef: MatDialogRef<OfficehoursStudentDialogComponent>;
    dialogRef = this.dialog.open(OfficehoursStudentDialogComponent);
    dialogRef.componentInstance.header = header;
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.description = description;
    dialogRef.componentInstance.meetingID = id;
    dialogRef.componentInstance.editSlot = true;
    return dialogRef.afterClosed();
  }

}
