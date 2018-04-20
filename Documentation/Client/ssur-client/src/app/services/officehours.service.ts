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
  lecturerID: string;
  delInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: Http, private userService: UserService) {
    this.lecturerID = userService.loggedInUserInfo.getValue()[0]._id;
    this.getLecturerInfo();
  }

  public getLecturerInfo() {
    this.http.get('https://asesprechstunde.herokuapp.com/api/user/' + this.lecturerID + '/officehours')
      .subscribe(res => {
        this.lecInfo.next(res.json());
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
    this.http
      .delete('https://asesprechstunde.herokuapp.com/api/officehours/' + id)
      .subscribe(res => {
        this.delInfo.next(res.status);
      });
  }
}
