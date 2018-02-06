import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarComponent} from 'ap-angular2-fullcalendar';
import * as $ from 'jquery';
import * as moment from 'moment';
import { ProfessorService} from '../services/ProfessorService';
import { ScheduleService} from '../services/ScheduleService';
import {buildAnimationAst} from '@angular/animations/browser/src/dsl/animation_ast_builder';

@Component({
  selector: 'app-main-cal',
  templateUrl: './main-cal.component.html',
  styleUrls: ['./main-cal.component.css']
})
export class MainCalComponent implements OnInit {

  private professorHoursListener;

  profs;
  selectedProf;
  officeHour;
  newEvents;
  officeHoursProf;
  fetchedOfficeHours;
  finalEvents = [];

  calendarOptions;

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

  constructor(private professorService: ProfessorService, private scheduleService: ScheduleService) {
    this.professorHoursListener = this.scheduleService.selectedOfficeHours.subscribe( data => {
      // this.enterOfficeHours(data);
      this.officeHoursProf = data;
      console.log(data);
      if (data.length > 0) {
        console.log('in der SChleife ggggggggggggggggggggggggggg');
        this.enterOfficeHours();
      }
    });
  }

  ngOnInit() {

    this.calendarOptions = {

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

      // this.newEvents.push(this.myEvent);
      // this.calendarOptions.events = this.newEvents;
      // this.myCalendar.fullCalendar('renderEvents', this.newEvents, true);

      // this.getOfficeHoursFromService();   ***neu

      // this.newEvents.push(this.myEvent);
    // this.calendarOptions.events.push(this.myEvent);
    // this.calendarOptions.events.push(this.myOfficeHour);
    // this.myCalendar.fullCalendar('updateEvents');

  }

  enterOfficeHours() {
    for (let u = 0; u < this.officeHoursProf.length; u++) {
      const currentOfficeHour = this.officeHoursProf[u];
      this.enterSingleOfficeHour(currentOfficeHour);
    }
    console.log('=========All Elements rendered====================');
    console.log(this.finalEvents);
    this.finalEvents.push(this.myEvent);
    this.myCalendar.fullCalendar('renderEvents', this.finalEvents);
    console.log('ultimateRendered');
  }

  enterSingleOfficeHour(currentOfficeHour) {
      const type = currentOfficeHour.type;
      const endOF = currentOfficeHour.end;
        // moment(currentOfficeHour.end).format('YYYY-MM-DDTHH:mm:ss');
      const start = currentOfficeHour.start;
        // moment(currentOfficeHour.start).format('YYYY-MM-DDTHH:mm:ss');
      this.myOfficeHour = {
        title: type,
        start: start,
        end: endOF,
        color: 'green'
      };
      console.log('ooooooooooooooooo Am Rendern ooooooooooooo');
      console.log(this.myOfficeHour);
      /*this.calendarOptions.events.push(this.myOfficeHour);
      this.newEvents.push(this.myOfficeHour);*/
      this.finalEvents.push(this.myOfficeHour);
      // this.myCalendar.fullCalendar('renderEvent', this.myOfficeHour);
      // this.myCalendar.fullCalendar('rerenderEvents');
  }

  // ________________________________Codereste_unwichtig___________________________________


 /* changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }*/

  onCalendarInit(initialized: boolean) {
    console.log('Calendar initialized');
  }

}
