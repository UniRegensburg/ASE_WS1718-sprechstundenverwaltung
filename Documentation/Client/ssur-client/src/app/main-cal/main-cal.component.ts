import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarComponent} from 'ap-angular2-fullcalendar';
import * as $ from 'jquery';
import * as moment from 'moment';
import { ProfessorService} from '../services/ProfessorService';
import {buildAnimationAst} from '@angular/animations/browser/src/dsl/animation_ast_builder';

@Component({
  selector: 'app-main-cal',
  templateUrl: './main-cal.component.html',
  styleUrls: ['./main-cal.component.css']
})
export class MainCalComponent implements OnInit {

  profs;
  selectedProf;
  officeHour;
  newEvents;

  calendarOptions = {

    editable: false,
    handleWindowResize: true,
    weekends: false,
    defaultView: 'agendaWeek',
    minTime: '08:00:00',
    maxTime: '20:00:00',
    columnFormat: 'ddd D/M',
    timeFormat: 'HH:mm',
    displayEventTime: true,
    allDayText: 'Ganztägig',

    events: []};

  myEvent = {
    title: 'Pauls Event',
    allDay: false,
    start: '2018-01-31T16:00:00',
    end: '2018-01-31T17:30:00'
  };

  dummyEvent = {
    title: 'Lalas Event',
    allDay: false,
    start: '2018-02-01T16:00:00',
    end: '2018-02-01T17:30:00'
  };

  myOfficeHour = {
    title: 'title',
    start: 'start',
    end: 'end'
  };

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  // @ViewChild('myCalendar', {read: ElementRef}) myCalendar: ElementRef;

  changeCalendarView(view) {

    this.myCalendar.fullCalendar('changeView', view);

  }

  constructor(private professorService: ProfessorService) { }

  ngOnInit() {

    this.getProfs();

      this.newEvents = [
          {
            title: 'All Day Event',
            start: '2016-09-01'
          },
          {
            title: 'Long Event',
            start: '2016-09-07',
            end: '2016-09-10'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-09-09T16:00:00'
          },
          {
            title: 'Event',
            start: '2018-01-31T11:00:00'
          },
          {
            title: 'Conference',
            start: '2018-01-30T08:00:00',
            end: '2018-01-30T09:30:00'
          },
        {
          title: 'PASSTNICHT',
          start: '2018-01-30T14:00:00',
          end: '2018-01-30T16:30:00'
        }
        ];
      this.newEvents.push(this.myEvent);
        this.calendarOptions.events = this.newEvents;
        this.myCalendar.fullCalendar('renderEvents', this.newEvents, true);

  }

  getProfs() {
    this.professorService.getProfs().subscribe(profs => {this.profs = profs;
        this.getSelectedProf ('abc12346'); } ,
      err => alert(err),
      () => console.log(this.profs));
  }

  getSelectedProf(id) {
    for (let i = 0; i < this.profs.length; i++) {
      this.selectedProf = (this.profs[i]);
        if (this.selectedProf.id === id) {
          this.officeHour = this.selectedProf.officeHours;
          console.log(this.officeHour);
          this.buildOfficeHour(this.officeHour);
        }
    }
  }

  buildOfficeHour(officeHour) {
    // const weekday = this.officeHour.weekday;
    const startTime = this.officeHour.startTime;
    const dummyDay = '2018-02-01T';
    const dummyEndTime = '14:00:00';
    this.myOfficeHour = {
      title: 'Offene Sprechstunde',
      start: '2018-01-30T12:00:00',
      end: '2018-01-30T12:30:00'
    };
    this.newEvents.push(this.myOfficeHour);
    console.log(this.newEvents);
  }


 /* changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }*/

  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }

}
