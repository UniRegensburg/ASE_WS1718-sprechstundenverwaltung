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
    this.ownOfficeHoursListener = this.officeHoursService.profInfo.subscribe(data => {
      this.ownOfficeHours = data;
      console.log(data);
      if (data.length <= 0) {
        return;
      } else {
        this.distinguishRoles();
      }
    });
  }

  // calendarOptions;

  myOfficeHour = {
    id: 'id',
    title: 'title',
    start: 'start',
    end: 'end',
    color: 'color'
  };

  myOwnOfficeHour = {
    id: 'id',
    title: 'title',
    start: 'start',
    end: 'end',
    color: 'color'
  };

  calendarOptions: Object = {

    header: {
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
    editable: false,
    handleWindowResize: true,
    weekends: false,
    defaultView: 'agendaWeek',
    navLinks: true,
    minTime: '08:00:00',
    maxTime: '18:00:00',
    slotDuration: '00:15:00',
    columnFormat: 'ddd D/M',
    nowIndicator: true,
    displayEventTime: true,
    allDayText: 'Ganztägig',
    slotLabelFormat: 'HH:mm',
  };

  eventClick(event) {
    console.log(event);
    this.dialogsService.registerOfficeHourDialog('Sprechstunde belegen');
  }

/*  changeCalendarView(view) {

    this.myCalendar.fullCalendar('changeView', view);

  }*/
  ngOnInit() {}




  machesrichtig(data) {
    console.log('In Mach es richtig');
    console.log(data);
    this.dialogsService.registerOfficeHourDialog('Sprechstunde belegen');
  }

  // distinguish if user role is professor or student
  distinguishRoles() {
    this.finalEvents = [];
    if (this.userRole === 'Student') {
      this.enterOfficeHours();
    } else if (this.userRole === 'Professor') {
      this.enterOwnOfficeHours();
      console.log('Ich bin ein Professor');
    }
  }

  // enters professors own office hours
  // ToDo: Fetch real dates
  enterOwnOfficeHours() {
    for (let v = 0; v < this.ownOfficeHours.slots.length; v++) {
      const currentSlot = this.ownOfficeHours.slots[v];
      this.enterSingleOwnOfficeHour(currentSlot);
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
    for (let u = 0; u < this.officeHoursProf.length; u++) {
      const currentOfficeHour = this.officeHoursProf[u];
      this.enterSingleOfficeHour(currentOfficeHour);
    }
    console.log(this.finalEvents);
    this.myCalendar.fullCalendar('removeEvents');
    this.myCalendar.fullCalendar('renderEvents', this.finalEvents, true);
  }

  // create single office hour and push it into finalEvents
  enterSingleOfficeHour(currentOfficeHour) {
      const  id = currentOfficeHour.id;
      const endOF = moment(currentOfficeHour.end).format('YYYY-MM-DDTHH:mm:ss');
      const start = moment(currentOfficeHour.start).format('YYYY-MM-DDTHH:mm:ss');
      let officeHourTitle;
      let typeColor;
      if (currentOfficeHour.type === 'office hour') {
        typeColor = 'green';
        officeHourTitle = 'Offene Sprechstunde';
      }  else {
        typeColor = 'grey';
        officeHourTitle = 'I*Forgott*My*Name';
      }
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
  }

  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }
}
