import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { NotesService } from '../../services/notes.service';
import { UserService } from '../../services/UserService';
import {NotesDialogComponent} from '../notes-dialog/notes-dialog.component';

@Component({
  selector: 'app-slot-details-dialog',
  templateUrl: './slot-details-dialog.component.html',
  styleUrls: ['./slot-details-dialog.component.css']
})
export class SlotDetailsDialogComponent implements OnInit {
  note: string;
  notes;
  convID;
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;
  currentProfID;

  public startDateTime: any;
  public title: string;
  public description: string;
  public studentID: string;
  public studentName: string;


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

  getStudentName(id: string) {
    this.userService.getUserInfoByID(id)
      .then(res => {
        if (res !== undefined) {
          this.studentName = res[0].foreName + ' ' + res[0].lastName;
        }
      })
      .catch(errorMessage => {
        this.studentName = 'Not available';
        console.log(errorMessage);
      });
  }

  getProfID() {
    this.userService.loggedInUserInfo.subscribe(data => {
      this.currentProfID = data[0]._id;
    });
    return this.currentProfID;
  }

  constructor(public dialogRef: MatDialogRef<SlotDetailsDialogComponent>,
              private notesService: NotesService,
              private dialog: MatDialog,
              private userService: UserService) {
  }

  ngOnInit() {
  }
}
