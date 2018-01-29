import { Component, OnInit } from '@angular/core';

import { DialogsService } from '../../dialogs/dialogs.service';
import { OfficehoursDialogComponent } from '../../dialogs/officehours-dialog/officehours-dialog.component';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css']
})
export class SidebarContentComponent implements OnInit {

  public result: any;

  constructor(private dialogsService: DialogsService) { }

  public _openDialogBox() {
    this.dialogsService
      .openDialog()
      .subscribe(res => this.result = res);
  }

  ngOnInit() {
  }

}
