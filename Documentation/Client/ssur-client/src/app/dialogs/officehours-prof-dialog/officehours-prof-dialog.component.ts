import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OfficehoursService } from '../../services/Officehours.service';

@Component({
  selector: 'app-officehours-prof-dialog',
  templateUrl: './officehours-prof-dialog.component.html',
  styleUrls: ['./officehours-prof-dialog.component.css']
})
export class OfficehoursProfDialogComponent implements OnInit {

  public title: string;
  selectedDateTime: any;
  slotSize: number;
  slotAmount: number;
  confirmButton: string;
  descriptionNeeded = false;

  createOfficeHour() {
    this.officehourService.createOfficeHourLecturer(this.selectedDateTime, this.slotSize, this.slotAmount, this.descriptionNeeded);
    this.dialogRef.close(true);
  }

  constructor(public dialogRef: MatDialogRef<OfficehoursProfDialogComponent>, private officehourService: OfficehoursService) { }

  ngOnInit() {
  }

}
