import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfessorService {

  selectedProfessor: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public existingProfs = [];
  private url = 'https://asesprechstunde.herokuapp.com/api/lecturers';

  constructor (private http: Http) {
    this.getAllProfs();
  }

  // Get all lecturers
 getAllProfs() {
    this.http.get(this.url).subscribe(data => {
      for(var i = 0; i < data.json().length; i++) {
        this.existingProfs.push(data.json()[i]);
      }
    });
  }

  setSelectedProf(profID: string) {
    this.selectedProfessor.next(profID);
  }

}
