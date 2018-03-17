import { Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NotesDialogComponent} from "./notes-dialog/notes-dialog.component";
import {NotesService} from "../services/notes.service";
import {Inject} from "@angular/core";


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [NotesService]
})
export class NotesComponent implements OnInit {

  note: string;
  notes = this.notesService.getNotes();
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;

  constructor(private dialog: MatDialog, public notesService: NotesService) { }

  ngOnInit() {
  }

  openNotesDialog(): void {
      this.NotesDialogRef = this.dialog.open(NotesDialogComponent, {
        width: '500px',
        height: '500px',
        data: {notes: this.notes}
      });

      this.NotesDialogRef.afterClosed().subscribe(result => {
        this.note = result;
        this.notesService.setNotes(this.note);
      });
  }
}
