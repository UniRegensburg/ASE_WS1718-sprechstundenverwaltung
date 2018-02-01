import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {post} from 'selenium-webdriver/http';

@Injectable()
export class OfficehoursService {

  constructor(private http: Http) { }

  getProfessors() {
    return this.http.get(`https://ase1718data.herokuapp.com/professors/abc12345`) // needs to be adjusted to get all profs later
      .map(res => res.json());
  }

  // Wenn Antwort vom server nach dem schicken ok. variablen direkt übernehmen-> observables

  public setOfficeHour(datetime: any, slotSize: number, slotAmount: number) {
    const body = {
      weekday: 'wednesday',
      slotNumber: slotAmount,
      slotLength: slotSize,
      startTime: datetime
    };

    this.http
      .patch('https://ase1718data.herokuapp.com/professors/me/officehours', body)
      .subscribe();
  }

}
