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
  title_sidebar = 'Nächste Sprechstunden:'
  private meetingsListener;
  private meetingsChangeListener;
  public meetingExists: boolean;
  public meetingsArray = [];

  title: string;
  end: any;
  professor: string;

  constructor(private dialogsService: DialogsService, private meetingsService: MeetingsService) {
    this.meetingsListener = meetingsService.meetingsInfo.subscribe(data => {

      // Check if entry exists
      if (data[0] !== undefined) {
        //this.buttonName = 'Editieren';
        this.meetingExists = true;

        //console.log('Test-----> ' + data[0].start + '  ' + data.length);

        // Iterate through each meeting in data-array
        for (var i = 0; i < data.length; i++) {

          // Fill array with objects of partly transformed meetings values
          this.meetingsArray.push({
            id: data[i]._id,
            start: moment(data[i].start).format('DD.MM.YYYY, HH:mm'),
            end: moment(data[i].end).format('HH:mm'),
            title: data[i].title,
            description: data[i].description
          });
        }
      } else {
        //this.buttonName = 'Anlegen';
        this.meetingExists = false;
      }



      /*this.title = data.title;
      this.description = data.description;
      this.start = moment(data.start).format('DD.MM.YYYY, HH:mm');
      this.end = moment(data.end).format('HH:mm');
      this.professor = data.professor;*/
    });
  }

  // Located here for testing purposes (later used in calendar when slot is selected)
  public requestSlot(meetingID: string) {
    this.dialogsService
      .registerOfficeHourDialog('Sprechstunde belegen', meetingID)
      .subscribe(res => this.result = res);
  }

  public editSlot(meetingID: string, title: string, description: string) {
    this.dialogsService
      .editRegisteredOfficeHourDialog('Sprechstunde editieren', title, description, meetingID)
      .subscribe(res => this.result = res);

    this.meetingsChangeListener = this.meetingsService.meetingsChanged.subscribe(data => {

      // Check if successfully edited or deleted
      if(data == 200) {
        // Empty the array
        this.meetingsArray.splice(0,this.meetingsArray.length);
        // Get existing database entries
        this.meetingsService.getMeetings();
      }
    });
  }

  ngOnInit() {
  }

}
