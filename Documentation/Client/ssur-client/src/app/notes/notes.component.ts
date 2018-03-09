import { Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotesDialogComponent} from "./notes-dialog/notes-dialog.component";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  NotesDialogRef: MatDialogRef<NotesDialogComponent>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNotesDialog(): void {
      this.NotesDialogRef = this.dialog.open(NotesDialogComponent, {
        width: '500px',
        height: '500px',
      });

      this.NotesDialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed.');
      });
  }
}
