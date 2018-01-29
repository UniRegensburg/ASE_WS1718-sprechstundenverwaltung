import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-officehours-dialog',
  templateUrl: './officehours-dialog.component.html',
  styleUrls: ['./officehours-dialog.component.css']
})
export class OfficehoursDialogComponent implements OnInit {

  startDate: string;
  endDate: string;

  repetitions = [
    {value: 'rep-day', viewValue: 'wöchentlich'},
    {value: 'rep-month', viewValue: 'monatlich'}
  ];

  _dateChanged(type: string, event: MatDatepickerInputEvent<Date>) {

    if (type === 'start') { this.startDate = event.value.toDateString() + ' - '; }
    if (type === 'end') { this.endDate = event.value.toDateString(); }

  }

  constructor(public dialogRef: MatDialogRef<OfficehoursDialogComponent>) { }

  ngOnInit() {
  }

}
