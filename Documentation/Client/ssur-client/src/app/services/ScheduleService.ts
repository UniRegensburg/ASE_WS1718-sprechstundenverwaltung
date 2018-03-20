import {Injectable} from '@angular/core';
import { Http} from '@angular/http';
import { ProfessorService} from './ProfessorService';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class ScheduleService {

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
    this.idOfClickedEvent.next(data);
    console.log(this.idOfClickedEvent);
  }

}
