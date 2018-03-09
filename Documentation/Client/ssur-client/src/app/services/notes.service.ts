import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class NotesService {
  notes = [];
  constructor() { }


  getNotes(){
    return this.notes;
  }

  //todo: change to german timestamp
  setNotes(newNote){
    let timestamp = moment().format('lll');
    this.notes.push(timestamp+': '+newNote);
  }
}
