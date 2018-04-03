import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {Http} from "@angular/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class NotesService {
  notes = [];
  baseUrl = 'https://asesprechstunde.herokuapp.com/api/conversation/'
  NoteInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: Http) { }

  getNotes(id){
    let convUrl = this.baseUrl+id;
    this.http.get(convUrl).subscribe(res=>{
      this.NoteInfo.next(res.json());
      this.notes = JSON.parse(res['_body']).notes;

    });
    return this.notes;
  }

  setNotes(newNote, id){
    let convUrl = this.baseUrl+id;
    let timestamp = moment().format('lll');
    this.notes.push(timestamp+': '+newNote);
    const notesObject = {
      notes: this.notes
    }

    this.http.patch(convUrl, notesObject).subscribe(
      res => {
        this.NoteInfo.next([res.json()]);
      });
  }
}
