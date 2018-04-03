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

  getSingleMeeting(data): any {
    const shortURL = 'https://asesprechstunde.herokuapp.com/api/officehourslot/';
    const finalURL = shortURL + data;

    return this.http.get(finalURL).subscribe(meetingData => {
      this.selectedMeeting.next(JSON.parse(meetingData['_body']));
      console.log(meetingData);
      console.log(this.selectedMeeting);
    });
  }
}

