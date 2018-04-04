import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

import { NotesService } from '../../services/notes.service';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-slot-details-dialog',
  templateUrl: './slot-details-dialog.component.html',
  styleUrls: ['./slot-details-dialog.component.css']
})
export class SlotDetailsDialogComponent implements OnInit {

  public startDateTime: any;
  public title: string;
  public description: string;
  public studentID: string;
  public studentName: string;

  userListener;

  startNewConverstion() {
    // Todo: Execute function in notesservice
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
              private userService: UserService) { }

  ngOnInit() {
  }

}
