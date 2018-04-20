import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  loggedInUserInfo: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public userIsLoggedIn: boolean;

  constructor(private http: Http) {}

  // Check if user exists in db
  public checkIfUserExists(name: string, password:string):Promise<any> {
    const body = {
      email: name,
      password: password
    };
    return this.http
      .post('https://asesprechstunde.herokuapp.com/api/isuser', body).toPromise()
      .then(response => response.json())
      .catch(errorMessage => console.log('Error:' + errorMessage.statusText + ' ' + errorMessage.status));
  }

  // Save logged in user to local storage (save session data)
  public saveSession(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Delete item in local storage (delete session data)
  public logoutUser(): boolean {
    localStorage.removeItem('currentUser');
    return true;
  }

  // Create user
  public createUser(userEmail: string, userPassword: string, userForeName: string, userLastName: string, userRole: string):Promise<any> {
    const body = {
      email: userEmail,
      password: userPassword,
      foreName: userForeName,
      lastName: userLastName,
      role: userRole
    };

    return this.http
      .post('https://asesprechstunde.herokuapp.com/api/user', body).toPromise()
      .then(response => response.json())
      .catch(errorMessage => console.log('Error:' + errorMessage.statusText + ' ' + errorMessage.status));
  }

  // Get user info from server
  public getUserInfoByID(userID: string): Promise<any> {
    // console.log('Anfrage-------------------');
    return this.http
      .get('https://asesprechstunde.herokuapp.com/api/user/' + userID).toPromise()
      .then(response => [response.json()])
      .catch(errorMessage => console.log('Error:' + errorMessage.statusText + ' ' + errorMessage.status));
  }
}
