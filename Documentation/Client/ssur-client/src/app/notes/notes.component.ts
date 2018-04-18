import { Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotesDialogComponent} from '../dialogs/notes-dialog/notes-dialog.component';
import {NotesService} from '../services/notes.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [NotesService]
})
export class NotesComponent implements OnInit {
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;

  constructor(private dialog: MatDialog, public notesService: NotesService) {}

  ngOnInit() {}
}
