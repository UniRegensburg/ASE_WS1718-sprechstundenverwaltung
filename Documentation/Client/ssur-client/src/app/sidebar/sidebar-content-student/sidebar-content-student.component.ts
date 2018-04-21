import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DialogsService } from '../../dialogs/dialogs.service';
import { MeetingsService } from '../../services/Meetings.service';
import { UserService } from '../../services/UserService';


@Component({
  selector: 'app-sidebar-content-student',
  templateUrl: './sidebar-content-student.component.html',
  styleUrls: ['./sidebar-content-student.component.css']
})
export class SidebarContentStudentComponent implements OnInit {

  public result: boolean;
  title_sidebar = 'Belegte Sprechstunden:';
  private meetingsListener;
  private meetingsChangeListener;
  public meetingExists: boolean;
  public meetingsArray = [];
  private lecturerName: string;
  title: string;
  end: any;

  constructor(private dialogsService: DialogsService, private meetingsService: MeetingsService, private userService: UserService) {

    this.meetingsListener = meetingsService.meetingsInfo.subscribe(data => {

      // Check if entry exists
      if (data.length > 0) {
        this.meetingExists = true;

        // Iterate through each meeting in data-array
        for (let i = 0; i < data.length; i++) {

          // Get user name
          this.userService.getUserInfoByID(data[i].lecturerID)
            .then(res => {

              if(res != undefined) {
                this.lecturerName = res[0].foreName + ' ' + res[0].lastName;

                // Fill array with objects of partly transformed meetings values
                this.meetingsArray.push({
                  id: data[i]._id,
                  start: moment(data[i].start).format('DD.MM.YYYY, HH:mm'),
                  end: moment(data[i].end).format('HH:mm'),
                  lecturerID: data[i].lecturerID,
                  lecturer: this.lecturerName,
                  title: data[i].title,
                  description: data[i].description
                });
              }
            })
            .catch(errorMessage => console.log(errorMessage))
        }
      } else {
        this.meetingExists = false;
      }
    });
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

  openNotesDialog(profID) {

  }

  ngOnInit() {}
}
