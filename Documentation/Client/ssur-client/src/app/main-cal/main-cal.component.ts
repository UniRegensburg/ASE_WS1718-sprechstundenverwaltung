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
    slotLabelFormat: 'HH:mm',

    events: []};

  myEvent = {
    title: 'ASE Zwischenpräsentation',
    allDay: false,
    start: '2018-02-02T12:15:00',
    end: '2018-02-02T15:45:00'
  };

  myOfficeHour = {
    title: 'title',
    start: 'start',
    end: 'end',
    color: 'color'
  };

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  // @ViewChild('myCalendar', {read: ElementRef}) myCalendar: ElementRef;

  /*changeCalendarView(view) {

    this.myCalendar.fullCalendar('changeView', view);

  }*/

  constructor(private professorService: ProfessorService) { }

  ngOnInit() {

    this.getProfs();

      this.newEvents = [
          {
            title: 'Ganztägiges Event',
            start: '2018-02-01',
            color: 'orange'
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
          title: 'Noch so ein Event',
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
        this.getSelectedProf ('abc12346');
        console.log('Professor has changed'); } ,
      err => alert(err),
      () => console.log(this.profs));
  }

  getSelectedProf(id) {
    for (let i = 0; i < this.profs.length; i++) {
      this.selectedProf = (this.profs[i]);
      console.log(this.selectedProf);
        if (this.selectedProf.id === id) {
          this.officeHour = this.selectedProf.officeHours;
          console.log(this.selectedProf);
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
      end: '2018-01-30T13:30:00',
      color: 'green'
    };
    this.newEvents.push(this.myOfficeHour);
    this.calendarOptions.events = this.newEvents;
    this.myCalendar.fullCalendar('updateEvents', this.newEvents);
    console.log(this.newEvents);
  }


 /* changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }*/

  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }

}
