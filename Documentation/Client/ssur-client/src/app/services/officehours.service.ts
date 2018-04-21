import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { UserService } from './UserService';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OfficehoursService {

  lecInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  lecturerID: string;
  delInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: Http, private userService: UserService) {

    this.lecturerID = userService.loggedInUserInfo.getValue()[0]._id;

    if(userService.loggedInUserInfo.getValue()[0].role == 'lecturer') {
      this.getLecturerInfo();
    }
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
        this.lecInfo.next([res.json()]);
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
