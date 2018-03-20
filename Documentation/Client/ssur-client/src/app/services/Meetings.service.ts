import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MeetingsService {

  meetingsInfo = [];
  meetings: BehaviorSubject<any> = new BehaviorSubject<any>(this.meetingsInfo);

  constructor(private http: Http) {
    this.getMeetings();
  }

  // Get meetings
  // Todo: Change to get meetings of logged in user
  getMeetings() {
    this.http.get(`https://ase1718data.herokuapp.com/meetings/123456754`)
      .subscribe(data => {
        this.meetings.next(data.json());
        //console.log('Meetings: ' + data);
      });
  }
}
