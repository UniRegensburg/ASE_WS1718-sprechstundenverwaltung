import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ScheduleService} from '../services/ScheduleService';
import { DialogsService} from '../dialogs/dialogs.service';
import { UserService} from '../services/UserService';
import { OfficehoursService } from '../services/Officehours.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-main-cal',
  templateUrl: './main-cal.component.html',
  styleUrls: ['./main-cal.component.css']
})
export class MainCalComponent implements OnInit {

  private professorHoursListener;
  private userListener;
  private ownOfficeHoursListener;

  ownOfficeHours;
  officeHoursProf;
  userRole;
  finalEvents = [];

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  constructor(private scheduleService: ScheduleService, private dialogsService: DialogsService, private userService: UserService,
              private officeHoursService: OfficehoursService) {
    this.userListener = this.userService.loggedinUser.subscribe( data => {
      this.userRole = data;
      console.log(this.userRole);
      console.log(this.ownOfficeHours);
      if (this.ownOfficeHours == null) {
        return;
      } else {
        this.distinguishRoles();
      }
    });
    this.professorHoursListener = this.scheduleService.selectedOfficeHours.subscribe(data => {
      this.officeHoursProf = data;
      console.log(data);
      if (data.length == null) {
        return;
      } else {
        this.distinguishRoles();
      }
    });
    this.ownOfficeHoursListener = this.officeHoursService.lecInfo.subscribe(data => {
      this.ownOfficeHours = data;
      if (data.length <= 0) {
        return;
      } else {
        this.distinguishRoles();
      }
    });
  }

 /* myOfficeHour = {
    id: 'id',
    title: 'title',
    start: 'start',
    end: 'end',
    color: 'color'
  };*/

  myOwnOfficeHour = {
    id: 'id',
    title: 'title',
    start: 'start',
    end: 'end',
    color: 'color'
  };

  slotTemplate = {
    id: 'id',
    title: 'title',
    start: 'start',
    end: 'end',
    color: 'color'
  };

  calendarOptions: Object = {

    header: {
      left: false,
      center: 'agendaWeek,basicDay'
    },
    buttonText: {
      today:    'Heute',
      month:    'Monat',
      week:     'Woche',
      day:      'Tag'
    },
    locale: 'de',
    timeFormat: 'HH:mm',
    handleWindowResize: true,
    weekends: false,
    defaultView: 'agendaWeek',
    navLinks: true,
    minTime: '09:00:00',
    maxTime: '18:00:00',
    slotDuration: '00:10:00',
    columnFormat: 'ddd D/M',
    nowIndicator: true,
    displayEventTime: true,
    displayEventEnd: false,
    allDaySlot: false,
    slotLabelFormat: 'HH:mm',
  };

  // catch click event on calendar slot and redirect to dialog service for new appointment
  eventClick(event) {
    console.log(event);
    const clickedId = event.event.id;
    console.log(clickedId);
    if (this.userRole === 'Student' && event.event.title === 'Frei') {
      this.dialogsService.registerOfficeHourDialog('Sprechstunde belegen', clickedId);
    } else if (this.userRole === 'Professor') {
      return;
    }
  }

/*  changeCalendarView(view) {

    this.myCalendar.fullCalendar('changeView', view);

  }*/
  ngOnInit() {}


  // distinguish if user role is professor or student
  distinguishRoles() {
    this.finalEvents = [];
    this.myCalendar.fullCalendar('removeEvents');
    if (this.userRole === 'Student') {
      this.enterOfficeHours();
    } else if (this.userRole === 'Professor') {
      this.enterOwnOfficeHours();
    }
  }

  // enters professors own office hours
  // ToDo: Fetch real dates
  enterOwnOfficeHours() {
    const ownOfficeHour = this.ownOfficeHours[0];
    for (let v = 0; v < ownOfficeHour.slotCount; v++) {
      const currentSlot = ownOfficeHour.slots[v];
      console.log(currentSlot);
      this.enterSingleSlot(currentSlot);
      // this.enterSingleOwnOfficeHour(currentSlot);
    }
    console.log(this.finalEvents);
    this.myCalendar.fullCalendar('removeEvents');
    this.myCalendar.fullCalendar('renderEvents', this.finalEvents, true);
  }

  enterSingleOwnOfficeHour(currentSlot) {
    const id = '55';
    const start = moment(currentSlot.startTime).format('YYYY-MM-DDTHH:mm:ss');
    const end = moment(currentSlot.endTime).format('YYYY-MM-DDTHH:mm:ss');
    const myTitle = 'schöner Titel';
    const color = 'green';
    console.log(start);
    console.log(end);
    this.myOwnOfficeHour = {
      id: id,
      title : myTitle,
      start : start,
      end : end,
      color : color
    };
    this.finalEvents.push(this.myOwnOfficeHour);
  }

  // renders all events when ready;
  // "stick true" ensures, that the events stay visible when changing dates
  enterOfficeHours() {
    const currentOfficeHour = this.officeHoursProf[0];
    console.log(currentOfficeHour.slotCount);
    for (let u = 0; u < currentOfficeHour.slotCount; u++) {
      console.log(currentOfficeHour.slots[u]);
      const singleSlot = currentOfficeHour.slots[u];
      this.enterSingleSlot(singleSlot);
    }
    console.log(this.finalEvents);
    this.myCalendar.fullCalendar('removeEvents');
    this.myCalendar.fullCalendar('renderEvents', this.finalEvents, true);
  }

  enterSingleSlot(currentSlot) {
    const slotID = currentSlot._id;
    const startOf = moment(currentSlot.start).format('YYYY-MM-DDTHH:mm:ss');
    const endOf = moment(currentSlot.end).format('YYYY-MM-DDTHH:mm:ss');
    let typeColor;
    let slotStatus;
    if (currentSlot.slotTaken === false) {
      slotStatus = 'Belegt';
      typeColor = 'red';
    } else if (currentSlot.slotTaken === true) {
      slotStatus = 'Frei';
      typeColor = 'green';
    }

    this.slotTemplate = {
      id: slotID,
      title: slotStatus,
      start: startOf,
      end: endOf,
      color: typeColor
    };
    this.finalEvents.push(this.slotTemplate);
  }

  // create single office hour and push it into finalEvents
  /*enterSingleOfficeHour(currentOfficeHour) {
      const  id = currentOfficeHour._id;
      const endOF = moment(currentOfficeHour.end).format('YYYY-MM-DDTHH:mm:ss');
      const start = moment(currentOfficeHour.start).format('YYYY-MM-DDTHH:mm:ss');
      const officeHourTitle = 'Offene Sprechstunde';
      let typeColor = 'green';
      let statusText = '   Frei';
      if (currentOfficeHour.status === 'closed') {
        typeColor = 'red';
        statusText = '   Belegt';
      }
      this.myOfficeHour = {
        id: id,
        title: officeHourTitle + statusText,
        start: start,
        end: endOF,
        color: typeColor
      };
      this.finalEvents.push(this.myOfficeHour);
  }*/

  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }
}
