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


    /*this.userRole = userService.loggedInUserInfo.getValue()[0].role;
    console.log(this.userRole);
    console.log(this.ownOfficeHours);
    if (this.ownOfficeHours == null) {
      return;
    } else {
      this.distinguishRoles();
    }*/

    this.userListener = this.userService.loggedInUserInfo.subscribe( data => {
      this.userRole = data[0].role;
      console.log(this.userRole);
      if (this.ownOfficeHours == null) {
        return;
      } else {
        this.distinguishRoles();
      }
    });

    this.professorHoursListener = this.scheduleService.selectedOfficeHours.subscribe(data => {
      this.officeHoursProf = data;
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

  slotTemplate = {
    id: 'id',
    title: 'title',
    start: 'start',
    end: 'end',
    color: 'color',
    description: ''
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
    navLinkDayClick: true,
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
    const studentId = event.event._id;
    const clickedId = event.event.id;
    const eventDescription = event.event.description;
    const eventStart = event.event.start;
    const eventTitle = event.event.title;
    if (this.userRole === 'student' && event.event.title === 'Frei') {
      this.dialogsService.registerOfficeHourDialog('Sprechstunde belegen', clickedId);
    } else if (this.userRole === 'lecturer') {
      this.dialogsService.showSlotDetails(eventStart, eventTitle, eventDescription, studentId);
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
    if (this.userRole === 'student' && this.officeHoursProf[0] !== undefined) {
        this.enterOfficeHours();
    } else if (this.userRole === 'lecturer') {
      this.enterOwnOfficeHours();
    }
  }

  // enters professors own office hours
  enterOwnOfficeHours() {
    for (let w = 0; w < this.ownOfficeHours.length; w++) {

    const ownOfficeHour = this.ownOfficeHours[w];
      for (let v = 0; v < ownOfficeHour.slotCount; v++) {
        const currentSlot = ownOfficeHour.slots[v];
        this.enterSingleSlot(currentSlot);
      }
    }
    console.log(this.finalEvents);
    this.myCalendar.fullCalendar('removeEvents');
    this.myCalendar.fullCalendar('renderEvents', this.finalEvents, true);
  }

  // enters office hours from selected professor
  // renders all events when ready;
  // "stick true" ensures, that the events stay visible when changing dates
  enterOfficeHours() {
    const currentOfficeHour = this.officeHoursProf[0];
    if (currentOfficeHour.slotCount !== null) {
      for (let u = 0; u < currentOfficeHour.slotCount; u++) {
        const singleSlot = currentOfficeHour.slots[u];
        this.enterSingleSlot(singleSlot);
      }
      console.log(this.finalEvents);
      this.myCalendar.fullCalendar('removeEvents');
      this.myCalendar.fullCalendar('renderEvents', this.finalEvents, true);
    }
  }

  // create single office hour and push it into finalEvents
  enterSingleSlot(currentSlot) {
    const slotID = currentSlot._id;
    const slotDescription = currentSlot.description;
    const startOf = moment(currentSlot.start).format('YYYY-MM-DDTHH:mm:ss');
    const endOf = moment(currentSlot.end).format('YYYY-MM-DDTHH:mm:ss');
    let typeColor;
    let slotStatus;
    if (currentSlot.slotTaken === false) {
      slotStatus = 'Frei';
      typeColor = 'green';
    } else if (currentSlot.slotTaken === true) {
      slotStatus = 'Belegt';
      typeColor = 'red';
    }

    this.slotTemplate = {
      id: slotID,
      title: slotStatus,
      start: startOf,
      end: endOf,
      color: typeColor,
      description: slotDescription
    };
    this.finalEvents.push(this.slotTemplate);
  }

  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
    this.distinguishRoles();
  }
}
