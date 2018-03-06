import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarComponent} from 'ap-angular2-fullcalendar';
import * as moment from 'moment';
import { ScheduleService} from '../services/ScheduleService';
import { DialogsService} from '../dialogs/dialogs.service';
import { UserService} from '../services/UserService';

@Component({
  selector: 'app-main-cal',
  templateUrl: './main-cal.component.html',
  styleUrls: ['./main-cal.component.css']
})
export class MainCalComponent implements OnInit {

  private professorHoursListener;
  private userListener;

  officeHoursProf;
  userRole;
  finalEvents = [];

  calendarOptions;

  myOfficeHour = {
    id: 'id',
    title: 'title',
    start: 'start',
    end: 'end',
    color: 'color'
  };


  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  changeCalendarView(view) {

    this.myCalendar.fullCalendar('changeView', view);

  }

  constructor(private scheduleService: ScheduleService, private dialogsService: DialogsService, private userService: UserService) {
    this.userListener = this.userService.loggedinUser.subscribe( data => {
      this.userRole = data;
      console.log(this.userRole);
    });
    this.professorHoursListener = this.scheduleService.selectedOfficeHours.subscribe( data => {
      this.officeHoursProf = data;
      console.log(data);
      if (data.length > 0) {
        this.finalEvents = [];
        console.log(this.finalEvents);
        this.enterOfficeHours();
      }
    });
  }

  ngOnInit() {

    this.calendarOptions = {

      eventClick: (event) => {
        console.log('auf ein Event geklickt');
        console.log(event.id);
        this.scheduleService.onEventClicked(event.id);

        // Hannes fragenÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ
        if (this.userRole === 'Professor') {
          this.dialogsService.editOfficeHourDialog('Sprechstunde editieren', this.officeHoursProf.startTime,
            this.officeHoursProf.slotLength, this.officeHoursProf.slotNumber);
        }

        // ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ

        return false;
      },

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

  enterSingleOfficeHour(currentOfficeHour) {
      const  id = currentOfficeHour.id;
      const endOF = moment(currentOfficeHour.end).format('YYYY-MM-DDTHH:mm:ss');
      const start = moment(currentOfficeHour.start).format('YYYY-MM-DDTHH:mm:ss');
      let officeHourTitle;
      let typeColor;
      if (currentOfficeHour.type === 'office hour') {
        typeColor = 'green';
        officeHourTitle = 'Offene Sprechstunde';
      } else if (currentOfficeHour.type === 'individual') {
        typeColor = 'blue';
        officeHourTitle = 'Individualtermin';
      } else {
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
