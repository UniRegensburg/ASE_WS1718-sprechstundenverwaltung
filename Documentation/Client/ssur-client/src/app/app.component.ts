import { Component } from '@angular/core';
import { UserService } from './services/UserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'Sprechstunde.ur.de';
  public logoutSucessfull = false;

  constructor (public userService: UserService) {

    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      this.userService.userIsLoggedIn = true;
      this.userService.loggedInUserInfo.next([currentUser]);
    } else {
      this.userService.userIsLoggedIn = false;
    }
  }

  public logout() {
    if (this.userService.logoutUser()) {
      this.logoutSucessfull = true;
      this.userService.userIsLoggedIn = false;
    }
  }

  public login() {
    window.location.reload();
  }
}
