import { Component, OnInit } from '@angular/core';

import { DialogsService } from '../../dialogs/dialogs.service';
import { MeetingsService } from '../../services/Meetings.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sidebar-content-student',
  templateUrl: './sidebar-content-student.component.html',
  styleUrls: ['./sidebar-content-student.component.css']
})
export class SidebarContentStudentComponent implements OnInit {

  public result: boolean;
  title_sidebar = 'Nächste Sprechtunden:'
  private meetingsListener;

  title: string;
  description: string;
  start: any;
  end: any;
  duration: any;
  professor: string;

  constructor(private dialogsService: DialogsService, private meetingsService: MeetingsService) {
    this.meetingsListener = meetingsService.meetings.subscribe(data => {
      this.title = data.title;
      this.description = data.description;
      this.start = moment(data.start).format('DD.MM.YYYY, HH:mm');
      this.end = moment(data.end).format('HH:mm');
      this.professor = data.professor;
    });
  }

  // Located here for testing purposes (later used in calendar when slot is selected)
  public requestSlot() {
    this.dialogsService
      .registerOfficeHourDialog('Sprechstunde belegen')
      .subscribe(res => this.result = res);
  }

  public editSlot() {
    this.dialogsService
      // title & body are dummies and should be filled by server data
      .editRegisteredOfficeHourDialog('Sprechstunde editieren', this.title, this.description)
      .subscribe(res => this.result = res);
  }
  // end testing area

  ngOnInit() {
  }

}
