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
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;
  currentProfID;
  userListener;

  public startDateTime: any;
  public title: string;
  public description: string;
  public studentID: string;
  public studentName: string;


  openNotesDialog() {
    this.notesService.checkIfConversationExists(this.getProfID(), this.studentID);
    const convid = this.notesService.currentConvID;
    this.notes = this.notesService.getNotes(convid);
    console.log('convid beim öffnen des dialogs: ' + convid);
    this.NotesDialogRef = this.dialog.open(NotesDialogComponent, {
      width: '500px',
      height: '500px',
      data: {notes: this.notes}
    });

    this.NotesDialogRef.afterClosed().subscribe(result => {
      this.note = result;
       if (this.note !== undefined) {
          this.notesService.setNotes(this.note, convid);
      }
    });
  }

  getStudentName() {
    this.userService.getUserInfoByID(this.studentID);
    this.userListener = this.userService.userInfo.subscribe(data => {
      if (data !== undefined) {
        this.studentName = data.foreName + ' ' + data.lastName;
      }
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
              private userService: UserService) { }

  ngOnInit() {
  }

}
