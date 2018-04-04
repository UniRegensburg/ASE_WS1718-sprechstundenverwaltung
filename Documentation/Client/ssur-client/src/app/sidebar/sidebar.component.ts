import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/UserService';
import {NotesService} from "../services/notes.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private userListener;
  public role: string;

  constructor(private userService: UserService,
              private notesService: NotesService) {
    // Subscribe to UserService to check what role is logged in (here just for testing)
    this.userListener = userService.loggedinUser.subscribe(data => this.role = data);
  }

  ngOnInit() {
  }

}
