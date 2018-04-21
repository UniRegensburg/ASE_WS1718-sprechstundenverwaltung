import { Component, OnInit } from '@angular/core';
import { DialogsService } from '../../dialogs/dialogs.service';
import { OfficehoursService } from '../../services/Officehours.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sidebar-content-prof',
  templateUrl: './sidebar-content-prof.component.html',
  styleUrls: ['./sidebar-content-prof.component.css']
})
export class SidebarContentProfComponent implements OnInit {

  public result: boolean;
  title_sidebar = 'Angelegte Sprechstunden:';
  public officehourExists: boolean;
  public officehoursArray = [];

  slotsSize: number;
  slotsAmount: number;

  private profInfoListener;
  private deleteListener;

  constructor(private dialogsService: DialogsService, private officehourService: OfficehoursService) {
    this.profInfoListener = officehourService.lecInfo.subscribe(data => {

      // Check if entry exists
      if (data.length > 0) {
        this.officehourExists = true;

        // Iterate through each officehour in data-array
        for (let i = 0; i < data.length; i++) {
          this.slotsAmount = data[i].slotCount;
          this.slotsSize = data[i].slotLength;

          // Fill array with objects of partly transformed officehour values
          this.officehoursArray.push({
            id: data[i]._id.toString(),
            day: moment(data[i].start).format('dddd'),
            startDate: moment(data[i].start).format('DD.MM.YYYY'),
            startingTime: moment(data[i].start).format('HH:mm'),
            endingTime: moment(data[i].start).add(data[i].slotCount * data[i].slotLength, 'minute').format('HH:mm')
          });
        }
      } else {
        this.officehourExists = false;
      }
    });
  }

  public _createOfficeHour() {
    this.dialogsService
      .createOfficeHourDialog('Sprechstunde anlegen')
      .subscribe(res => this.result = res);
  }

  public _deleteOfficehour(officehourID: string) {
    if (confirm('Wollen Sie die Sprechstunde wirklich löschen?')) {
      this.officehourService.deleteOfficehourLecturer(officehourID);

      this.deleteListener = this.officehourService.delInfo.subscribe(data => {

        // Check if successfully deleted
        if(data == 200) {
          // Empty the array
          this.officehoursArray.splice(0,this.officehoursArray.length);
          // Get existing database entries
          this.officehourService.getLecturerInfo();
        }
      });
    }
  }

  ngOnInit() {}
}
