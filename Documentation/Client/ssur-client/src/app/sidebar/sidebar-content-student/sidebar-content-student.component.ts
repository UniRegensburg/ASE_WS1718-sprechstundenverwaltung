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
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;
  note: string;
  notes;
  convID;
  studentID;
  userListener;
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

  openNotesDialog(lec, stud) {
    this.notesService.checkIfConversationExists(lec, stud)
      .then(res => {
        this.convID = res;
        console.log(this.convID);
        // Request notes
        this.notesService.getNotes(this.convID)

        // When notes arrive...
          .then(data => {

            // Check if its actual data
            if (data !== undefined) {

              // If so, set as notes
              this.notes = data.notes;

              // Needs to be done here instead of notes service (i think)
              this.notesService.NoteInfo.next(data);
              // Do the remaining stuff as before
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
          })
          .catch(errorMessage => console.log(errorMessage));
      })
      .catch(error => {
          this.notesService.createNewConversation(lec, stud);
          this.convID = this.notesService.currentConvID;
      });
  }


  ngOnInit() {}
}
