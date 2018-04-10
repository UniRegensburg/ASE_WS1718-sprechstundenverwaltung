import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { UserService } from './UserService';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OfficehoursService {

  lecInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  //lecturerID = '5ab52a8fc9513830d07bc13b';  // Todo: Later get ID of logged-in user from userservice
  lecturerID: string;

  delInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: Http, private userService: UserService) {
    this.lecturerID = userService.loggedInUserInfo.getValue()[0]._id;
    this.getLecturerInfo();
  }

  public getLecturerInfo() {
    //console.log('Getting officehour...');
    this.http.get('https://asesprechstunde.herokuapp.com/api/user/' + this.lecturerID + '/officehours')
      .subscribe(res => {
        this.lecInfo.next(res.json());
        //console.log(JSON.parse(res['_body']));
      });
  }

  public createOfficeHourLecturer(datetime: any, slotSize: number, slotAmount: number, descriptionNeeded: boolean) {

    const body = {
      start: datetime,
      slotLength: slotSize,
      slotCount: slotAmount,
      lecturerID: this.lecturerID,
      descriptionNeeded: descriptionNeeded
    };

    this.http
      .post('https://asesprechstunde.herokuapp.com/api/officehours', body)
      .subscribe(res => {
        this.lecInfo.next([res.json()]);  // needs to be in an array, comes back as object
      });

  }

  public deleteOfficehourLecturer(id: string) {
    //console.log('Deleting officehour: ' + 'https://asesprechstunde.herokuapp.com/api/officehours/' + id)

    this.http
      .delete('https://asesprechstunde.herokuapp.com/api/officehours/' + id)
      .subscribe(res => {
        //console.log('antwort-----> ' + res.status);
        //this.lecInfo.next([res.json()]);
        this.delInfo.next(res.status);
      });
  }
}
