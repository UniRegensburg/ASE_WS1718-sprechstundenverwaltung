import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  userRole: string;
  loggedinUser: BehaviorSubject<string> = new BehaviorSubject<string>(this.userRole); // Change to hold array later
  userInfo: BehaviorSubject<any> = new BehaviorSubject<any>({});


  constructor(private http: Http) {
    this.loggedinUser.next('Professor');  // Replace with getLoggedInUserInfo() later or remove completely
  }

  getLoggedInUserInfo(userID: string) {
    // Todo: Get Info of currently logged in user and add to observable
  }

  public getUserInfoByID(userID: string) {
    this.http
      .get('https://asesprechstunde.herokuapp.com/api/user/' + userID)
      .subscribe(res => {
        //console.log('Userinfo--------> ' + res.json().name);
        this.userInfo.next(res.json());
      });
  }

}
