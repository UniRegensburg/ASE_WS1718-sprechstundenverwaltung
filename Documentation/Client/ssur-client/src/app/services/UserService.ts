import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {


  loggedinUser: BehaviorSubject<any> = new BehaviorSubject<any>('lecturer'); // Change to hold object later
  userInfo: BehaviorSubject<any> = new BehaviorSubject<any>({});


  constructor(private http: Http) {
    //this.loggedinUser.next('Professor');  // Replace with getLoggedInUserInfo() later or remove completely
  }

  getLoggedInUserInfo(userID: string) {
    // Todo: Get Info of currently logged in user and add to observable
  }

  public getUserInfoByID(userID: string) {
    //console.log('Anfrage-------------------');
    this.http
      .get('https://asesprechstunde.herokuapp.com/api/user/' + userID)
      .subscribe(res => {
        //console.log('Userinfo--------> ' + res.json().name);
        this.userInfo.next(res.json());
      });
  }

}
