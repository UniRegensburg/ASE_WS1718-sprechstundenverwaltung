import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import {_catch} from 'rxjs/operator/catch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName: string;
  public password: string;
  public foreName: string;
  public surName: string;
  public email: string;
  public role: string;
  public registration = false;
  public loginError = false;

  constructor(private userService: UserService) {}

  loginUser() {
    this.userService.checkIfUserExists(this.userName)
      .then(user => {
        if(user != undefined) {
          console.log('User logged in');
          this.userService.userIsLoggedIn = true;
          this.userService.loggedInUserInfo.next(user);
          this.userService.saveSession(user[0]);
        }
        else {
          this.loginError = true;
          this.password = '';
        }
      })
      .catch(errorMessage => console.log(errorMessage));
  }

  showRegistration() {
    this.registration = true;
  }

  registerUser() {
    this.userService.createUser(this.email, this.userName, this.password, this.foreName, this.surName, this.role)
      .then(user => {
        if(user != undefined) {
          console.log('User created');
          this.userService.userIsLoggedIn = true;
          this.userService.loggedInUserInfo.next([user]);
        }
      })
      .catch(errorMessage => console.log(errorMessage));
  }

  ngOnInit() {
  }

}
