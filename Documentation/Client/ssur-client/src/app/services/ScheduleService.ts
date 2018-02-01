import {Injectable} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { of} from 'rxjs/observable/of';
import { Http, Response} from '@angular/http';
import { ProfessorService} from './ProfessorService';

@Injectable()
export class ScheduleService {

  private url = 'https://ase1718data.herokuapp.com/professors/abc12345/meetings';
  private shortUrl = 'https://ase1718data.herokuapp.com/professors/';
  private finalUrl;
  profID;
  profsOfficeHours;

  constructor(private professorService: ProfessorService, private http: Http) { }

  getProfessors(): any {
    // this.professorService.getSelectedProf().subscribe(profs => {this.profID = profs; } );
    const profForNow = this.professorService.getSelectedProf();
    console.log(profForNow);
  }

  getOfficeHours() {
    console.log('InSchedServiceGetOfficeHours');
    this.finalUrl = this.shortUrl + this.professorService + '/meetings';
    return this.http.get(this.url).map((res: Response) => res.json());
  }

}
