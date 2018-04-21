import { Component, OnInit } from '@angular/core';

import { NotesService } from '../../services/notes.service';
import { UserService } from '../../services/UserService';
import {NotesDialogComponent} from '../../dialogs/notes-dialog/notes-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-sidebar-content-conversation',
  templateUrl: './sidebar-content-conv.component.html',
  styleUrls: ['./sidebar-content-conv.component.css']
})
export class SidebarContentConvComponent implements OnInit {

  public title_sidebar = 'Ihre Unterhaltungen:';
  private notesListener;
  public conversationsArray = [];
  public conversationExists = false;
  public userRole: string;
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;
  notes;
  note;

  constructor(private notesService: NotesService,
              private userService: UserService,
              private dialog: MatDialog) {

    // Check which role logged in user has
    this.userRole = userService.loggedInUserInfo.getValue()[0].role;

    // Request conversations of logged in user
    notesService.getConversations(userService.loggedInUserInfo.getValue()[0]._id, userService.loggedInUserInfo.getValue()[0].role);

    // Get conversations
    this.notesListener = notesService.Conversations.subscribe(data => {

      let conversationPartner: string;

      // Check if entry exists
      if (data.length > 0) {

        this.conversationExists = true;

        // Iterate through each conversation in data-array
        for (let i = 0; i < data.length; i++) {

          if (this.userRole === 'lecturer') {
            conversationPartner = data[i].student;
          }
          if (this.userRole === 'student') {
            conversationPartner = data[i].lecturer;
          }
          // console.log('Partner: ->>>>>>>>>>' + conversationPartner);

          // Fill array with objects
          this.conversationsArray.push({
            convID: data[i]._id,
            partnerID: conversationPartner,
            partnerName: ''
          });

          // When array is filled, execute function to fill in usernames
          if (i === data.length - 1) {
            this.fillInNames();
          }
        }
      } else {
        this.conversationExists = false;
      }

    });
  }

  private fillInNames() {

    let partnerName: string;

    for (let i = 0; i < this.conversationsArray.length; i++) {
      this.userService.getUserInfoByID(this.conversationsArray[i].partnerID)
        .then(data => {
          if (data !== undefined) {
            partnerName = data[0].foreName + ' ' + data[0].lastName;
            this.conversationsArray[i].partnerName = partnerName;
          }
        })
        .catch(errorMessage => console.log(errorMessage));
    }
  }


  openNotesDialog(convID) {

    // Request notes
    this.notesService.getNotes(convID)

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
              this.notesService.setNotes(this.note, convID);
            }
          });
        }
      })
      .catch(errorMessage => console.log(errorMessage));
  }

  ngOnInit() {
  }

}
