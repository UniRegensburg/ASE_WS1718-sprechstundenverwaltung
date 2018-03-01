import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarComponent} from 'ap-angular2-fullcalendar';
import * as $ from 'jquery';
import * as moment from 'moment';
import { ProfessorService} from '../services/ProfessorService';
import { ScheduleService} from '../services/ScheduleService';
import {buildAnimationAst} from '@angular/animations/browser/src/dsl/animation_ast_builder';
// import {cursorTo} from 'readline';

@Component({
  selector: 'app-main-cal',
  templateUrl: './main-cal.component.html',
  styleUrls: ['./main-cal.component.css']
})
export class MainCalComponent implements OnInit {

  private professorHoursListener;

  officeHoursProf;
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

  constructor(private professorService: ProfessorService, private scheduleService: ScheduleService) {
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
        return false;
      },

      header: {
        center: 'agendaWeek,basicDay'
      },
      buttonText: {
        today:    'Heute',
        month:    'Monat',
        week:     'Woche',
        day:      'Tag',
        list:     'Liste'
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

      // events: []
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
      const type = currentOfficeHour.type;
      const endOF = moment(currentOfficeHour.end).format('YYYY-MM-DDTHH:mm:ss');
      const start = moment(currentOfficeHour.start).format('YYYY-MM-DDTHH:mm:ss');
      console.log(id);
      let typeColor;
      if (currentOfficeHour.type === 'office hour') {
        typeColor = 'green';
      } else if (currentOfficeHour.type === 'individual') {
        typeColor = 'red';
      } else {
        typeColor = 'grey';
      }
      this.myOfficeHour = {
        id: id,
        title: type,
        start: start,
        end: endOF,
        color: typeColor
      };
      console.log(this.myOfficeHour);
      this.finalEvents.push(this.myOfficeHour);
  }


  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }

}
