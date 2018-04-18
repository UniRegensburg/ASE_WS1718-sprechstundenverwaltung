import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ScheduleService} from '../services/ScheduleService';
import { DialogsService} from '../dialogs/dialogs.service';
import { UserService} from '../services/UserService';
import { OfficehoursService } from '../services/Officehours.service';
import { CalendarComponent } from 'ng-fullcalendar';

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

    this.userListener = this.userService.loggedInUserInfo.subscribe( data => {
      this.userRole = data[0].role;
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
    studentID: '',
    id: 'id',
    title: 'title',
    start: 'start',
    end: 'end',
    color: 'color',
    description: '',
    slotStatus: ''
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
    const studentId = event.event.studentID;
    const clickedId = event.event.id;
    const eventDescription = event.event.description;
    const eventStart = event.event.start;
    const eventTitle = event.event.title;
    if (this.userRole === 'student' && event.event.slotStatus === 'Frei') {
      this.dialogsService.registerOfficeHourDialog('Sprechstunde belegen', clickedId);
      // this.myCalendar.fullCalendar('updateEvent', event );
    } else if (this.userRole === 'lecturer' && event.event.slotStatus === 'Belegt') {
      this.dialogsService.showSlotDetails(eventStart, eventTitle, eventDescription, studentId);
    }
  }

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
    for (let v = 0; v < this.officeHoursProf.length; v++) {
    const currentOfficeHour = this.officeHoursProf[v];
    if (currentOfficeHour.slotCount !== null) {
      for (let u = 0; u < currentOfficeHour.slotCount; u++) {
        const singleSlot = currentOfficeHour.slots[u];
        this.enterSingleSlot(singleSlot);
      }
    }
      console.log(this.finalEvents);
      this.myCalendar.fullCalendar('removeEvents');
      this.myCalendar.fullCalendar('renderEvents', this.finalEvents, true);
    }
  }

  // create single office hour and push it into finalEvents
  enterSingleSlot(currentSlot) {
    const slotID = currentSlot._id;
    const studentID = currentSlot.studentID;
    const slotDescription = currentSlot.description;
    const startOf = moment(currentSlot.start).format('YYYY-MM-DDTHH:mm:ss');
    const endOf = moment(currentSlot.end).format('YYYY-MM-DDTHH:mm:ss');

    let slotTitle = currentSlot.title;
    let slotStatus;
    let typeColor;

    if (currentSlot.slotTaken === false) {
      slotStatus = 'Frei';
      typeColor = 'green';
    } else if (currentSlot.slotTaken === true) {
      slotStatus = 'Belegt';
      typeColor = 'red';
    }

    if (this.userRole === 'student') {
      slotTitle = slotStatus;
    }

    this.slotTemplate = {
      id: slotID,
      studentID: studentID,
      title: slotTitle,
      start: startOf,
      end: endOf,
      color: typeColor,
      description: slotDescription,
      slotStatus: slotStatus
    };
    this.finalEvents.push(this.slotTemplate);
  }

  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
    this.distinguishRoles();
  }
}
