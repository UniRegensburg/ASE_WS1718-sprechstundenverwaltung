import { Component } from '@angular/core';
import {ProfessorSelectorComponent} from './professor-selector/professor-selector.component';
import { UserService } from './services/UserService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Sprechstunde@UR';

  constructor (public userService: UserService) {}

}
