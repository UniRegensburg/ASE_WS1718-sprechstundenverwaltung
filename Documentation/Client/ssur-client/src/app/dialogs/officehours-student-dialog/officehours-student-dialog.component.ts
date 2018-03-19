import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { ScheduleService } from '../../services/ScheduleService';
import { OfficehoursService } from '../../services/Officehours.service';


@Component({
  selector: 'app-officehours-student-dialog',
  templateUrl: './officehours-student-dialog.component.html',
  styleUrls: ['./officehours-student-dialog.component.css']
})
export class OfficehoursStudentDialogComponent implements OnInit {

  public header: string;
  public title: string;
  public description: string;
  public confirmButton: string;
  public showDeleteButton = false;

  // Confirm request of slot
  submitRequestedSlot() {
   this.officehourService.setOfficeHourStudent(this.title, this.description); // Todo: Get and send time of selected slot
    this.dialogRef.close(true);
  }

  // delete the reserved slot
  deleteSelectedSlot() {
    if (confirm('Wollen Sie die Sprechstunde wirklich löschen?')) {
      this.officehourService.deleteOfficeHourStudent();
    }
  }

  constructor(public dialogRef: MatDialogRef<OfficehoursStudentDialogComponent>, private officehourService: OfficehoursService) { }

  ngOnInit() {
  }

}
