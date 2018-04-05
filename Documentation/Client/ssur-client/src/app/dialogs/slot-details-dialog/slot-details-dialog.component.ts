import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { NotesService } from '../../services/notes.service';
import { UserService } from '../../services/UserService';
import {NotesDialogComponent} from "../notes-dialog/notes-dialog.component";

@Component({
  selector: 'app-slot-details-dialog',
  templateUrl: './slot-details-dialog.component.html',
  styleUrls: ['./slot-details-dialog.component.css']
})
export class SlotDetailsDialogComponent implements OnInit {
  note: string;
  id = '5ac0fccbfb910820e064fada';//todo: use actual id as parameter, not constant value of dummy-conversation
  notes = this.notesService.getNotes(this.id);
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;

  public startDateTime: any;
  public title: string;
  public description: string;
  public studentID: string;
  public studentName: string;

  userListener;
  startNewConversation() {
    this.notes = this.notesService.getNotes(this.id);
    this.NotesDialogRef = this.dialog.open(NotesDialogComponent, {
      width: '500px',
      height: '500px',
      data: {notes: this.notes}
    });

    this.NotesDialogRef.afterClosed().subscribe(result => {
      this.note = result;
      if (this.note != undefined) {
        this.notesService.setNotes(this.note, this.id);
      }
    });
  }

  getStudentName() {
    this.userService.getUserInfoByID(this.studentID);

    this.userListener = this.userService.userInfo.subscribe(data => {
      if(data != undefined) {
        this.studentName = data.foreName + ' ' + data.lastName;
      }
    });
  }

  constructor(public dialogRef: MatDialogRef<SlotDetailsDialogComponent>,
              private notesService: NotesService,
              private dialog: MatDialog,
              private userService: UserService) { }

  ngOnInit() {
  }

}
