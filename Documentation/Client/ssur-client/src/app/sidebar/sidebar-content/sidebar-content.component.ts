import { Component, OnInit } from '@angular/core';

import { DialogsService } from '../../dialogs/dialogs.service';
import { OfficehoursService } from '../../services/officehours.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css']
})
export class SidebarContentComponent implements OnInit {

  public result: boolean;
  day: any;
  startDate: any;
  startingTime: any;
  endingTime: any;
  slotsSize: number;
  slotsAmount: number;

  private profInfoListener;

  constructor(private dialogsService: DialogsService, private officehourService: OfficehoursService) {
    this.profInfoListener = officehourService.profInfo.subscribe(data => {
      //console.log(data.weekday);
      this.day = data.weekday;
      this.startDate = moment(data.startTime).format('DD.MM.YYYY');
      this.startingTime = moment(data.startTime).format('HH:mm');
      this.startingTime = moment(data.startTime).format('HH:mm');
      this.endingTime = moment(data.startTime);
      this.endingTime = moment(this.endingTime).add(data.slotNumber * data.slotLength, 'minute');
      this.endingTime = moment(this.endingTime).format('HH:mm');
      this.slotsAmount = data.slotNumber;
      this.slotsSize = data.slotLength;
    });
  }

  public _openDialogBox() {
    this.dialogsService
      .openDialog('Sprechstunde anlegen')
      .subscribe(res => this.result = res);
  }

  public _editOfficeHour() {
    this.profInfoListener = this.officehourService.profInfo.subscribe(data => {
      this.dialogsService
        .editDialog('Sprechstunde editieren', data.startTime, data.slotLength, data.slotNumber)
        .subscribe(res => this.result = res);
    });
  }

  ngOnInit() {
  }

}
