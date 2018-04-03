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

  getCurrentOfficeHours(data) {
    // this.finalUrl = this.shortURL + data + '/meetings';
    // neue final URL when rdy
    console.log(data);
    this.finalUrl = this.shortURL + data + '/officehours';

    this.http.get(this.finalUrl).subscribe(officeData => {
      this.selectedOfficeHours.next(JSON.parse(officeData['_body']));
    });
  }

  getSingleMeeting(data) {
    // GET https://asesprechstunde.herokuapp.com/api/officehourslot/"id"
    const shortURL = 'https://asesprechstunde.herokuapp.com/api/officehourslot/';
    const finalURL = shortURL + data;

    this.http.get(finalURL).subscribe(meetingData => {
      console.log(meetingData);
    });
  }
}
