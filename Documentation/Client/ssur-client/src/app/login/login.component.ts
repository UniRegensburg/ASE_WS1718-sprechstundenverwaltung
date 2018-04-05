import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  foreName: string;
  surName: string;
  email: string;
  role: string;
  needsToRegister = false;

  userListener;

  constructor(private userService: UserService) { }

  loginUser() {
    this.userService.checkIfUserExists(this.userName);
    this.userListener = this.userService.loggedInUserInfo.subscribe(data => {

      //console.log('Login-------->' + data.length);

      if(data.length > 0) {
        console.log('User logged in');
        this.userService.userIsLoggedIn.next(true);
      }
      else {
        this.needsToRegister = true;
      }
    });
  }

  registerUser() {
    this.userService.createUser(this.email, this.userName, this.password, this.foreName, this.surName, this.role);

    // Todo: Check response first
    this.userService.userIsLoggedIn.next(true);
  }

  ngOnInit() {
  }

}
