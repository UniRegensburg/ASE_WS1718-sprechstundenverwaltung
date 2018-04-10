import {Injectable} from '@angular/core';
import { Http} from '@angular/http';
import { ProfessorService} from './ProfessorService';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isString} from 'util';


@Injectable()
export class ScheduleService {

  private finalUrl;
  private shortURL = 'https://asesprechstunde.herokuapp.com/api/user/';

  private professorListener;

  constructor(private professorService: ProfessorService, private http: Http) {
    this.professorListener = professorService.selectedProfessor.subscribe(data => {
      if (isString(data)) {
        this.getCurrentOfficeHours(data);
      }
    });
  }

  selectedOfficeHours: BehaviorSubject<any> = new BehaviorSubject<any>({});

  getCurrentOfficeHours(data) {
    this.finalUrl = this.shortURL + data + '/officehours';

    this.http.get(this.finalUrl).subscribe(officeData => {
      this.selectedOfficeHours.next(JSON.parse(officeData['_body']));
    });
  }
}

