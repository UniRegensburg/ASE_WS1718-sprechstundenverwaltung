import {Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { of} from 'rxjs/observable/of';
import { Http, Response} from '@angular/http';
import { ProfessorService} from './ProfessorService';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class ScheduleService {

  private url = 'https://ase1718data.herokuapp.com/professors/abc12345/meetings';
  private shortUrl = 'https://ase1718data.herokuapp.com/professors/';
  private finalUrl;

  private professorListener;

  constructor(private professorService: ProfessorService, private http: Http) {
    this.professorListener = professorService.selectedProfessor.subscribe(data => {
      this.getCurrentOfficeHours(data);
    });
  }

  _selectedOfficeHours = {};
  selectedOfficeHours: BehaviorSubject<any> = new BehaviorSubject<any>(this._selectedOfficeHours);

  _idOfClickedEvent = {};
  idOfClickedEvent: BehaviorSubject<any> = new BehaviorSubject<any>(this._idOfClickedEvent);

  getCurrentOfficeHours(data) {
    this.finalUrl = this.shortUrl + data + '/meetings';

    this.http.get(this.finalUrl).subscribe(officeData => {
      this.selectedOfficeHours.next(JSON.parse(officeData['_body']));
    });
  }

  // provides ID of clicked event
  onEventClicked(data) {
    this.idOfClickedEvent = data;
    console.log(this.idOfClickedEvent);
  }

}
