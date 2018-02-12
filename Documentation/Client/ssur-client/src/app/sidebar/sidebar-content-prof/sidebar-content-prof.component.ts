import { Component, OnInit } from '@angular/core';

import { DialogsService } from '../../dialogs/dialogs.service';
import { OfficehoursService } from '../../services/Officehours.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sidebar-content-prof',
  templateUrl: './sidebar-content-prof.component.html',
  styleUrls: ['./sidebar-content-prof.component.css']
})
export class SidebarContentProfComponent implements OnInit {

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
      //this.startDate = moment(data.startTime).format('DD.MM.YYYY');
      this.startingTime = data.startTime;
      //this.startingTime = moment(data.startTime).format('HH:mm');
      this.endingTime = moment(data.startTime);
      this.endingTime = moment(this.endingTime).add(data.slotNumber * data.slotLength, 'minute');
      //this.endingTime = moment(this.endingTime).format('HH:mm');
      this.slotsAmount = data.slotNumber;
      this.slotsSize = data.slotLength;
    });
  }

  public _createOfficeHour() {
    this.dialogsService
      .createOfficeHourDialog('Sprechstunde anlegen')
      .subscribe(res => this.result = res);
  }

  public _editOfficeHour() {
    this.profInfoListener = this.officehourService.profInfo.subscribe(data => {
      this.dialogsService
        .editOfficeHourDialog('Sprechstunde editieren', data.startTime, data.slotLength, data.slotNumber)
        .subscribe(res => this.result = res);
    });
  }

  ngOnInit() {
  }

}
