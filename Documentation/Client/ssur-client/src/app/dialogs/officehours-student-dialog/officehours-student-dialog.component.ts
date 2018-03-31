import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { ScheduleService } from '../../services/ScheduleService';
import { OfficehoursService } from '../../services/Officehours.service';
import { MeetingsService } from '../../services/Meetings.service';


@Component({
  selector: 'app-officehours-student-dialog',
  templateUrl: './officehours-student-dialog.component.html',
  styleUrls: ['./officehours-student-dialog.component.css']
})
export class OfficehoursStudentDialogComponent implements OnInit {

  public header: string;
  public title: string;
  public description: string;
  public meetingID: string;
  //public confirmButton: string;
  public editSlot = false;

  // Confirm request of slot
  submitSelectedSlot(editSlot: boolean) {
   this.meetingService.setOrEditOfficehourSlot(this.title, this.description, this.meetingID, editSlot);
    this.dialogRef.close(true);
  }

  /*editSelectedSlot() {
    this.meetingService.editOfficehourSlot(this.title, this.description, this.meetingID);
    this.dialogRef.close(true);
  }*/

  // delete the reserved slot
  deleteSelectedSlot() {
    if (confirm('Wollen Sie die Sprechstunde wirklich löschen?')) {
      this.meetingService.deleteOfficehourSlot(this.meetingID);
      this.dialogRef.close(true);
    }
  }

  constructor(public dialogRef: MatDialogRef<OfficehoursStudentDialogComponent>, private meetingService: MeetingsService) { }

  ngOnInit() {
  }

}
