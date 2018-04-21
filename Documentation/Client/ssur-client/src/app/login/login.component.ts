import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public password: string;
  public foreName: string;
  public surName: string;
  public email: string;
  public role: string;
  public registration = false;
  public loginError = false;

  constructor(private userService: UserService) {}

  loginUser() {
    this.userService.checkIfUserExists(this.email, this.password)
      .then(user => {
        if(user != undefined) {
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
    this.userService.createUser(this.email, this.password, this.foreName, this.surName, this.role)
      .then(user => {
        if(user != undefined) {
          this.userService.userIsLoggedIn = true;
          this.userService.loggedInUserInfo.next([user]);
          this.userService.saveSession(user);
        }
      })
      .catch(errorMessage => console.log(errorMessage));
  }

  ngOnInit() {
  }

}
