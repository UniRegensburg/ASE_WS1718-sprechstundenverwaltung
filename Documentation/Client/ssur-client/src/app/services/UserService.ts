import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  //loggedinUser: BehaviorSubject<any> = new BehaviorSubject<any>('lecturer'); // Change to hold object later

  loggedInUserInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  userInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: Http) {
  }

  // Check if user exists in db
  // Todo: also check password -> adjust server route
  public checkIfUserExists(name: string) {
    const body = {
      userName: name
    };
    this.http
      .post('https://asesprechstunde.herokuapp.com/api/isuser', body)
      .subscribe(res => {
        //console.log('usercheck----->' + res.json()[0]._id);
        this.loggedInUserInfo.next(res.json());
      });
  }

  // Create user
  public createUser(userEmail: string, name: string, userPassword: string, userForeName: string, userLastName: string, userRole: string) {
    const body = {
      email: userEmail,
      userName: name,
      password: userPassword,
      foreName: userForeName,
      lastName: userLastName,
      role: userRole
    };

    this.http
      .post('https://asesprechstunde.herokuapp.com/api/user', body)
      .subscribe(res => {
        this.loggedInUserInfo.next(res.json());
      });
  }

  public getUserInfoByID(userID: string) {
    // console.log('Anfrage-------------------');
    this.http
      .get('https://asesprechstunde.herokuapp.com/api/user/' + userID)
      .subscribe(res => {
        // console.log('Userinfo--------> ' + res.json().name);
        this.userInfo.next(res.json());
      });
  }

}
