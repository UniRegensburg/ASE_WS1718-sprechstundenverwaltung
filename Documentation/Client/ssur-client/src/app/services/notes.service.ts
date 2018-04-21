import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NotesService {

  baseUrl = 'https://asesprechstunde.herokuapp.com/api/conversation/';
  NoteInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  Conversations: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  currentConvID;
  public convListener: boolean;
  notes = [];
  constructor(private http: Http) { }

  getNotes(id): Promise<any> {
    const convUrl = this.baseUrl + id;

    return this.http.get(convUrl).toPromise()
      // If server responded give back response as json
      .then(response => response.json())

      // Catch error if there is some server issue
      .catch(errorMessage => console.log('Error:' + errorMessage.statusText + ' ' + errorMessage.status));

  }

  setNotes(newNote, id) {
    const convUrl = this.baseUrl + id;
    const timestamp = moment().format('lll');
    this.notes.push([(timestamp + ': ' + newNote)]);
    const notesObject = {
      notes: this.notes
    };

    this.http.patch(convUrl, notesObject).subscribe(
      res => {
        this.NoteInfo.next([res.json()]);
      });
  }

  // Get all conversations for specific user
  getConversations(userID: string, userRole: string) {
    let url: string;
    if (userRole === 'lecturer') {
      url = this.baseUrl + 'lecturer/' + userID;
    }
    if (userRole === 'student') {
      url = this.baseUrl + 'student/' + userID;
    }
    this.http.get(url).subscribe(res => {
      this.Conversations.next(res.json());
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
        this.currentConvID = res.json()._id;
      }
    );
  }

  checkIfConversationExists(lec, stud): Promise<any> {
    const body = {
      lecturer: lec,
      student: stud
    };

    return this.http.post('https://asesprechstunde.herokuapp.com/api/isconversation', body).toPromise()
      .then(
        res => res.json()[0]._id)
      .catch(error => {
          console.log('Fehler aufgetreten' + error);
        }
      );
  }
}
