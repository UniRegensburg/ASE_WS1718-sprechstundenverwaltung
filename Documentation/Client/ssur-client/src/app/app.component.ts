import { Component } from '@angular/core';
import { UserService } from './services/UserService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sprechstunde.ur.de';

  constructor (public userService: UserService) {}

}
