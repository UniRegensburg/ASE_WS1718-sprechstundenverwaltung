import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class NotesService {
  notes = [];
  constructor() { }

//todo: add an id parameter and only return the notes of this id
  getNotes(){
    //let correct_notes = [];
    //for note in notes:
    //if (note.id == idparameter){correct_notes.push(note)
    //return correct_notes


    return this.notes;
  }



//todo: add an 'id'parameter
  //todo: add notes to the database and not only to the array
  setNotes(newNote){
    let timestamp = moment().format('lll');
    this.notes.push(timestamp+': '+newNote);
  }
}
