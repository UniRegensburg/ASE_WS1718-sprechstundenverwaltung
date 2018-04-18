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

  note: string;
  convid = '5ac0fccbfb910820e064fada' ; // todo: use actual id as parameter, not constant value of dummy-conversation
  notes = this.notesService.getNotes(this.convid);
  NotesDialogRef: MatDialogRef<NotesDialogComponent>;

  constructor(private dialog: MatDialog, public notesService: NotesService) {}

  ngOnInit() {}

  checkIfConversationExists(prof, student) {
    //dummycode:
    /*for (conv in convdb){
      if (conv.lecturer == prof && conv.student == student){
        return conv.id;
      }
      else
        createNewConv(id, prof, student, notes)
    }*/
  }

  openNotesDialog(stud, lec): void {
    // todo: check if already existing conversation in db
    // todo: if true: pass the notes of that
    // todo: if false: create a new conversation in the service & add to it
    this.notes = this.notesService.getNotes(this.convid);
    this.NotesDialogRef = this.dialog.open(NotesDialogComponent, {
        width: '500px',
        height: '500px',
        data: {notes: this.notes}
      });

      this.NotesDialogRef.afterClosed().subscribe(result => {
        this.note = result;
        if (this.note !== undefined) {
          // this.notesService.setNotes(this.note, this.convid);
        }
      });
  }
}
