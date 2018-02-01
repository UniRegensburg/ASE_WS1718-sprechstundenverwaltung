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
  profID;
  profsOfficeHours;

  private professorListener;

  constructor(private professorService: ProfessorService, private http: Http) {
    this.professorListener = professorService.selectedProfessor.subscribe(data => {
      // TODO Sprechstundentermine für Prof abrufen
      this.getCurrentOfficeHours(data);
      console.log(data);
    });
  }

  _selectedOfficeHours = {};
  selectedOfficeHours: BehaviorSubject<any> = new BehaviorSubject<any>(this._selectedOfficeHours);

  getCurrentOfficeHours(data) {
    console.log(data);
    this.finalUrl = this.shortUrl + data + '/meetings';
    console.log(this.finalUrl);
    console.log(this.selectedOfficeHours);

    this.http.get(this.finalUrl).subscribe(officeData => {
      this.selectedOfficeHours.next(JSON.parse(officeData['_body']));
      this.selectedOfficeHours = this.selectedOfficeHours.value;
    });
  }

  /*getProfessors(): any {
    // this.professorService.getSelectedProf().subscribe(profs => {this.profID = profs; } );
    const profForNow = this.professorService.getSelectedProf();
    console.log(profForNow);
  }

  getOfficeHours() {
    console.log('InSchedServiceGetOfficeHours');
    this.finalUrl = this.shortUrl + this.professorService + '/meetings';
    return this.http.get(this.url).map((res: Response) => res.json());
  }*/

}
