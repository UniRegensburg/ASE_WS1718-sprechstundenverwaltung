import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { UserService } from './UserService';

@Injectable()
export class MeetingsService {

  meetingsInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  meetingsChanged: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  //studentID = '5ab50fb9118d842c2423b0bb'; // Todo: Later get ID of logged-in user from userservice
  studentID: string;

  constructor(private http: Http, private userService: UserService) {
    this.studentID = userService.loggedInUserInfo.getValue()[0]._id;
    this.getMeetings();
  }

  // Get meetings
  public getMeetings() {
    this.http.get('https://asesprechstunde.herokuapp.com/api/user/' + this.studentID + '/officehourslot')
      .subscribe(res => {
        this.meetingsInfo.next(res.json());
        //console.log('Meetings: ' + res);
      });
  }

  // Take new slot or edit existing slot
  public setOrEditOfficehourSlot(slotTitle: string, slotDescription: string, slotID: string, editSlot: boolean) {
    const body = {
      studentID: this.studentID,
      title: slotTitle,
      description: slotDescription,
      slotTaken: true
    };

    this.http
      .patch('https://asesprechstunde.herokuapp.com/api/officehourslot/' + slotID, body)
      .subscribe(res => {

        if(editSlot){
          this.meetingsChanged.next(res.status);
        }
        else {
          this.meetingsInfo.next([res.json()]);
        }
      });
  }

/*  public editOfficehourSlot(slotTitle: string, slotDescription: string, slotID: string) {
    const body = {
      studentID: this.studentID,
      title: slotTitle,
      description: slotDescription,
      slotTaken: true
    };

    this.http
      .patch('https://asesprechstunde.herokuapp.com/api/officehourslot/' + slotID, body)
      .subscribe(res => {
        this.meetingsInfo.next(res.json());
      });
  }*/

  public deleteOfficehourSlot(slotID: string) {
    const body = {
      studentID: '',
      title: '',
      description: '',
      slotTaken: false
    };

    this.http
      .patch('https://asesprechstunde.herokuapp.com/api/officehourslot/' + slotID, body)
      .subscribe(res => {
        this.meetingsChanged.next(res.status);
      });
  }
}
