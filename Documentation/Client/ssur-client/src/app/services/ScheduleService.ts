import {Injectable} from '@angular/core';
import { Http} from '@angular/http';
import { ProfessorService} from './ProfessorService';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class ScheduleService {

  // private shortUrl = 'https://ase1718data.herokuapp.com/professors/';
  private finalUrl;

  // neue URL when rdy
  // GET https://asesprechstunde.herokuapp.com/api/user/"id"/officehours
  private shortURL = 'https://asesprechstunde.herokuapp.com/api/user/';

  private professorListener;

  constructor(private professorService: ProfessorService, private http: Http) {
    this.professorListener = professorService.selectedProfessor.subscribe(data => {
      this.getCurrentOfficeHours(data);
    });
  }

  _selectedOfficeHours = {};
  selectedOfficeHours: BehaviorSubject<any> = new BehaviorSubject<any>(this._selectedOfficeHours);

  _selectedMeeting = {};
  selectedMeeting: BehaviorSubject<any> = new BehaviorSubject<any>(this._selectedMeeting);

  getCurrentOfficeHours(data) {
    // this.finalUrl = this.shortURL + data + '/meetings';
    // neue final URL when rdy
    console.log(data);
    this.finalUrl = this.shortURL + data + '/officehours';

    this.http.get(this.finalUrl).subscribe(officeData => {
      this.selectedOfficeHours.next(JSON.parse(officeData['_body']));
    });
  }

 /* public getSingleMeeting(data): Promise<any> {
    const shortURL = 'https://asesprechstunde.herokuapp.com/api/officehourslot/';
    const finalURL = shortURL + data;

    const promise = new Promise((resolve, reject) => {

    })

    return this.http.get(finalURL).subscribe(meetingData => {
      this.selectedMeeting.next(JSON.parse(meetingData['_body']));
      console.log(meetingData);
      console.log(this.selectedMeeting);
    });
  }*/

  public doAsyncTask(data): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Async Work Complete');
        resolve();
      }, 1000);
    });
    return promise;
  }

  public getUserNameAsynchonously(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      if (Math.round(Math.random() * 10) % 2 === 0) {
        window.setTimeout(() => {
          resolve('Tom Joad');
        }, 1000);
      } else {
        window.setTimeout(() => {
          reject();
        }, 1000);
      }
    });
    return promise;
  }
}

