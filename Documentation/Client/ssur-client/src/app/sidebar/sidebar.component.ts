import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/UserService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private userListener;
  public role: string;

  constructor(userService: UserService) {
    // Subscribe to UserService to check what role is logged in
    this.userListener = userService.loggedinUser.subscribe(data => this.role = data);
  }

  ngOnInit() {
  }

}
