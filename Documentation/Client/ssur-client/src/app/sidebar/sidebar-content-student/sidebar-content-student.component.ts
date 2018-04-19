import { Component, OnInit } from '@angular/core';
import { DialogsService } from '../../dialogs/dialogs.service';
import { MeetingsService } from '../../services/Meetings.service';
import * as moment from 'moment';
import {NotesDialogComponent} from '../../dialogs/notes-dialog/notes-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NotesService} from '../../services/notes.service';
import {UserService} from '../../services/UserService';


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
  note: string;
  notes;
  convID;
  userListener;
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;
  currentProfID;
  studentID;

  private lecturerName: string;

  title: string;
  end: any;

  constructor(private dialogsService: DialogsService,
              private meetingsService: MeetingsService,
              private notesService: NotesService,
              private userService: UserService,
              private dialog: MatDialog) {

    this.meetingsListener = meetingsService.meetingsInfo.subscribe(data => {
      // Check if entry exists
      if (data.length > 0) {
        this.meetingExists = true;
        // Iterate through each meeting in data-array
        for (let i = 0; i < data.length; i++) {
          // Fill array with objects of partly transformed meetings values
          this.meetingsArray.push({
            id: data[i]._id,
            start: moment(data[i].start).format('DD.MM.YYYY, HH:mm'),
            end: moment(data[i].end).format('HH:mm'),
            title: data[i].title,
            description: data[i].description
          });

          // Get user name
          this.userService.getUserInfoByID(data[i].lecturerID)
            .then(res => {

              if (res !== undefined) {
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
            .catch(errorMessage => console.log(errorMessage));
        }
      } else {
        this.meetingExists = false;
      }
    });

    this.userListener = this.userService.loggedInUserInfo.subscribe( data => {
      this.studentID = data[0]._id;
      console.log(this.studentID);

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
      if (data === 200) {
        // Empty the array
        this.meetingsArray.splice(0, this.meetingsArray.length);
        // Get existing database entries
        this.meetingsService.getMeetings();
      }
    });
  }

  openNotesDialog() {
    console.log('opendialog');
    if (this.notesService.convListener === true) {
      this.convID = this.notesService.currentConvID;
      this.notes = this.notesService.getNotes(this.convID);
    } else {
      // todo: get id from lec and stud
    //  this.notesService.createNewConversation(this.getProfID(), this.studentID);
      this.convID = this.notesService.currentConvID;
    }
    console.log('convid im Dialog' +  this.convID);
    console.log('notes im Dialog: ' + this.notes);
    this.NotesDialogRef = this.dialog.open(NotesDialogComponent, {
      width: '500px',
      height: '500px',
      data: {notes: this.notes}
    });

    this.NotesDialogRef.afterClosed().subscribe(result => {
      this.note = result;
      if (this.note !== undefined) {
        this.notesService.setNotes(this.note, this.convID);
      }
    });
  }

  ngOnInit() {
    console.log('oninit');
    // this.notesService.checkIfConversationExists(this.getProfID(), this.studentID);
  }

}
