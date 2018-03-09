import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NotesComponent} from "../notes.component";
import {NotesService} from "../../services/notes.service";

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.css'],
  providers: [NotesService]
})
export class NotesDialogComponent implements OnInit {

  notes = [];

  constructor(
    public dialogRef: MatDialogRef<NotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public notesService: NotesService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveNote(note){
    this.notesService.setNotes(note);
    this.notes = this.notesService.getNotes();
  }
}
