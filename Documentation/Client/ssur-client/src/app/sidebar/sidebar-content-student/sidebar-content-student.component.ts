import { Component, OnInit } from '@angular/core';

import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-sidebar-content-student',
  templateUrl: './sidebar-content-student.component.html',
  styleUrls: ['./sidebar-content-student.component.css']
})
export class SidebarContentStudentComponent implements OnInit {

  public result: boolean;
  title_sidebar = 'Nächste Sprechtunden:'

  constructor(private dialogsService: DialogsService) { }

  // Located here for testing purposes (later used in calendar when slot is selected)
  public requestSlot() {
    this.dialogsService
      .registerOfficeHourDialog('Sprechstunde belegen')
      .subscribe(res => this.result = res);
  }

  public editSlot() {
    this.dialogsService
      // title & body are dummies and should be filled by server data
      .editRegisteredOfficeHourDialog('Sprechstunde editieren', 'Gewählter Titel', 'Gewählte Beschreibung')
      .subscribe(res => this.result = res);
  }
  // end testing area

  ngOnInit() {
  }

}
