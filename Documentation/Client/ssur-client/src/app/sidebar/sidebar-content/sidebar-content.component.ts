import { Component, OnInit } from '@angular/core';

import { DialogsService } from '../../dialogs/dialogs.service';
import { OfficehoursDialogComponent } from '../../dialogs/officehours-dialog/officehours-dialog.component';
import { OfficehoursService } from '../../services/officehours.service';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css']
})
export class SidebarContentComponent implements OnInit {

  public result: any;

  officeHour = [];
  slots = [];
  test: any;
  slotsNumber: any;
  /*
  startTime: number;
  endTime: number;
*/

  constructor(private dialogsService: DialogsService, private officehourService: OfficehoursService) {
    this.getOfficeHour();
    this.getSlots();
    //this.test = this.slots;
  }

  public _openDialogBox() {
    this.dialogsService
      .openDialog('Sprechstunde anlegen')
      .subscribe(res => this.result = res);
  }

  getOfficeHour() {
    this.officehourService.getProfessors().subscribe(data => this.officeHour = data['officeHours']);
  }

  getSlots() {
    this.officehourService.getProfessors().subscribe(data => this.slots = data.officeHours.slots);
    this.slotsNumber = this.slots.length;


  }

  //still Todo
  public _editOfficeHour() {

  }


  ngOnInit() {
  }

}
