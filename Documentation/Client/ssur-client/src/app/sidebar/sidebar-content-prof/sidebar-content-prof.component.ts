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

      //console.log('Logging---------->' + data[0]);
      // Check if entry exists
      if (data.length > 0) {
        //this.buttonName = 'Editieren';
        this.officehourExists = true;

        //console.log('Test-----> ' + data[0].start + '  ' + data.length);

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
        //this.buttonName = 'Anlegen';
        this.officehourExists = false;
      }
    });
  }

  public _createOfficeHour() {
    this.dialogsService
      .createOfficeHourDialog('Sprechstunde anlegen')
      .subscribe(res => this.result = res);
  }

 /* public _editOfficeHour(editbutton: boolean) {
    this.editButtonClicked = editbutton; // This is needed so the edit dialog doesn't pop up every time the subscribed data changes
    this.profInfoListener = this.officehourService.lecInfo.subscribe(data => {
      //console.log(this.editButtonClicked);
      if (this.editButtonClicked) {
      this.dialogsService
        .editOfficeHourDialog('Sprechstunde editieren', data.start, data.slotLength, data.slotCount)
        .subscribe(res => this.result = res); }
      this.editButtonClicked = false;
    });
  }*/

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

        // Search for id of deleted officehour given back from server in array and delete from array
        /*for(var i = 0; i < this.officehoursArray.length; i++) {
          if(this.officehoursArray[i].id == data[0]._id) {
            this.officehoursArray.splice(i, 1);
          }
        }*/
      });
    }
  }

  // just for testing
  showDetails() {
    this.dialogsService
      .showSlotDetails('2018-03-27 15:38:42.000', 'Titel', 'Beschreibung', '5ab52ad7c9513830d07bc13c')
      .subscribe(res => this.result = res);
  }

  ngOnInit() {
  }

}
