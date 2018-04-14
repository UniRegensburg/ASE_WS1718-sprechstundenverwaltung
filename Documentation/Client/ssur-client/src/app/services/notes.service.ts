import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NotesService {

  baseUrl = 'https://asesprechstunde.herokuapp.com/api/conversation/';
  NoteInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  newConversation;
  currentConvID;

  constructor(private http: Http) { }

  getNotes(id) {
    // this.currentConvID = id;
    let notes;
    const convUrl = this.baseUrl + id;
    this.http.get(convUrl).subscribe(res => {
      this.NoteInfo.next(res.json());
      notes = JSON.parse(res['_body']).notes;

    });
    console.log ('Notes:' + notes);
    console.log('aktuelle ConvID: ' + id);
    return notes;
  }

  setNotes(newNote, id) {
    const convUrl = this.baseUrl + id;
    const timestamp = moment().format('lll');
    const notes = [(timestamp + ': ' + newNote)];
    const notesObject = {
      notes: notes
    };

    this.http.patch(convUrl, notesObject).subscribe(
      res => {
        this.NoteInfo.next([res.json()]);
      });
  }


  createNewConversation(lec, stud) {
    const body = {
      lecturer: lec,
      student: stud,
      notes: [' '],
      files: []
    };

    this.http.post(this.baseUrl, body).subscribe(res => {
      this.newConversation = [res.json()];
      }
    );
  }

  checkIfConversationExists(lec, stud) {
    console.log('checking conversation... ');
    const body = {
      lecturer: lec,
      student: stud
    };

    this.http.post('https://asesprechstunde.herokuapp.com/api/isconversation', body)
      .subscribe(
        res => {
          console.log('Unterhaltung existiert: ' + (res.json()[0])._id);
          this.currentConvID = (res.json()[0]._id);
          this.getNotes(this.currentConvID); },
          error => {console.log('Fehler aufgetreten' + error); this.createNewConversation(lec, stud); }
      );

  }

}

