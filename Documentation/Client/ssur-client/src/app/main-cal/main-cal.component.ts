import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarComponent} from 'ap-angular2-fullcalendar';
import * as $ from 'jquery';
import * as moment from 'moment';
import { ProfessorService} from '../services/ProfessorService';

@Component({
  selector: 'app-main-cal',
  templateUrl: './main-cal.component.html',
  styleUrls: ['./main-cal.component.css']
})
export class MainCalComponent implements OnInit {

  profs;

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
    end: '2018-01-31T76:00:00'
  };

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  // @ViewChild('myCalendar', {read: ElementRef}) myCalendar: ElementRef;

  changeCalendarView(view) {

    this.myCalendar.fullCalendar('changeView', view);

  }

   /* calendarOptions: Object = {

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

    events: [
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
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T10:30:00',
        end: '2016-09-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00'
      }
    ]
  };*/

  constructor(private professorService: ProfessorService) { }

  ngOnInit() {

    this.getProfs();

    /*this.calendarOptions = {

      editable: false,
      handleWindowResize: true,
      weekends: false,
      defaultView: 'agendaWeek',
      minTime: '08:00:00',
      maxTime: '20:00:00',
      columnFormat: 'ddd D/M',
      timeFormat: 'HH:mm',
      displayEventTime: true,
      allDayText: 'Ganztägig',*/

      const newEvents = [
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
            title: 'Meeting',
            start: '2016-09-12T10:30:00',
            end: '2016-09-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2016-09-12T12:00:00'
          },
        ];
      newEvents.push(this.myEvent);
        this.calendarOptions.events = newEvents;
        this.myCalendar.fullCalendar('renderEvents', newEvents, true);
  }

  getProfs(): void {
    this.profs = this.professorService.getProfs();
    console.log(this.profs);
    console.log('inGetProfs');
  }

 /* changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }*/

  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }

}
