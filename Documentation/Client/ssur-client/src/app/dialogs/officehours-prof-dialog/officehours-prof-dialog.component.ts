import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {OwlDateTime} from 'ng-pick-datetime/date-time/date-time.class';
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

  createOfficeHour() {
    this.officehourService.setOfficeHour(this.selectedDateTime, this.slotSize, this.slotAmount);
    this.dialogRef.close(true);
  }

  /* needed later to select start- and enddate + repetitions
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
*/
  constructor(public dialogRef: MatDialogRef<OfficehoursProfDialogComponent>, private officehourService: OfficehoursService) { }

  ngOnInit() {
  }

}
