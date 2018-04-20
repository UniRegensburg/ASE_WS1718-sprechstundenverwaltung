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

  professorID;

  constructor(private professorService: ProfessorService, private http: Http) {
    this.professorListener = professorService.selectedProfessor.subscribe(data => {
      console.log(data);
      this.professorID = data;
      if (isString(data)) {
        this.getCurrentOfficeHours(data);
        // oder vielleicht besser:
        // this.getCurrentOfficeHours();
      }
    });
  }

  selectedOfficeHours: BehaviorSubject<any> = new BehaviorSubject<any>({});

  getCurrentOfficeHours(data) {
    // und hier dann data parameter raus und ->
    // this.finalUrl = this.shortURL + this.professorID + '/officehours';
    this.finalUrl = this.shortURL + data + '/officehours';
    console.log(this.finalUrl);
    this.http.get(this.finalUrl).subscribe(officeData => {
      this.selectedOfficeHours.next(JSON.parse(officeData['_body']));
    });
  }
}

