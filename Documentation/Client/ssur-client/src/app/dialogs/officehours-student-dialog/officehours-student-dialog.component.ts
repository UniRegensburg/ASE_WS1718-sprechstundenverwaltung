import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { ScheduleService } from '../../services/ScheduleService';


@Component({
  selector: 'app-officehours-student-dialog',
  templateUrl: './officehours-student-dialog.component.html',
  styleUrls: ['./officehours-student-dialog.component.css']
})
export class OfficehoursStudentDialogComponent implements OnInit {

  public header: string;
  public title: string;
  public body: string;
  public confirmButton: string;
  public showDeleteButton = false;

  // Confirm request of slot
  submitRequestedSlot() {
    // ToDo: What should happen after slot is requested (probably send data to server)
    this.dialogRef.close(true);
  }

  // delete the reserved slot
  deleteSelectedSlot() {
    if (confirm("Wollen Sie die Sprechstunde wirklich löschen?")) {
      // ToDo: What should happen after slot is deleted (probably send delete request to server)
    }
  }

  constructor(public dialogRef: MatDialogRef<OfficehoursStudentDialogComponent>, private scheduleService: ScheduleService) { }

  ngOnInit() {
  }

}
