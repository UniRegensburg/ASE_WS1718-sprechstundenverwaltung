import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {NotesComponent} from "../notes.component";
import {NotesService} from "../../services/notes.service";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.css']
})
export class NotesDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<NotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
