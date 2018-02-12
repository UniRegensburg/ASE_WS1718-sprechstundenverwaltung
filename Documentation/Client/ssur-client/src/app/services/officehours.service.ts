import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OfficehoursService {

  response: any;
  professorInfo = [];
  profInfo: BehaviorSubject<any> = new BehaviorSubject<any>(this.professorInfo);

  constructor(private http: Http) {
    this.getProfessorInfo();
  }

  // TODO: adjust to get all profs later
  getProfessorInfo() {
    this.http.get(`https://ase1718data.herokuapp.com/professors/abc12345`)
      .subscribe(data => {
        this.profInfo.next(data.json().officeHours);
        //console.log(JSON.parse(data['_body']).officeHours);
      });
  }

  public setOfficeHour(datetime: any, slotSize: number, slotAmount: number) {

    const body = {
      weekday: moment(datetime).format('dddd'),
      slotNumber: slotAmount,
      slotLength: slotSize,
      startTime: datetime
    };

    this.http
      .patch('https://ase1718data.herokuapp.com/professors/me/officehours', body)
      .subscribe(res => {
        //console.log(res);
        //console.log(res.status);
      });

    //this.profInfo.next(body); // TODO: Validate server response first. Bug: Opens diaolg again
  }
}
