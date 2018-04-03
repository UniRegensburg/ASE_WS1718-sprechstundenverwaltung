import { Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NotesDialogComponent} from "../dialogs/notes-dialog/notes-dialog.component";
import {NotesService} from "../services/notes.service";


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [NotesService]
})
export class NotesComponent implements OnInit {

  note: string;
  id = '5ac0fccbfb910820e064fada' ; //todo: use actual id as parameter, not constant value of dummy-conversation
  notes = this.notesService.getNotes(this.id);
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;

  constructor(private dialog: MatDialog, public notesService: NotesService) {}

  ngOnInit() {}

  openNotesDialog(): void {
    console.log(this.notes);
    this.notes = this.notesService.getNotes(this.id);
    this.NotesDialogRef = this.dialog.open(NotesDialogComponent, {
        width: '500px',
        height: '500px',
        data: {notes: this.notes}
      });

      this.NotesDialogRef.afterClosed().subscribe(result => {
        this.note = result;
        this.notesService.setNotes(this.note, this.id);
      });
  }
}
