import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {Http} from "@angular/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class NotesService {
  notes = [];
  baseUrl = 'https://asesprechstunde.herokuapp.com/api/conversation/'
  NoteInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  newConversation;

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



  createNewConversation(){
    const body ={
      lecturer: "5ab53157d7dc852ce4870756",
      student: "5ab52ad7c9513830d07bc13c",
      notes: ["bla1", "blub2"],
      files: []
    }

    this.http.post(this.baseUrl, body).subscribe(res =>{
      this.newConversation = [res.json()];
      console.log(this.newConversation)

      }
    );
  }
}
