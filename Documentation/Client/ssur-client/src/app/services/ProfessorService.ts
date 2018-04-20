import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfessorService {

  selectedProfessor: BehaviorSubject<any> = new BehaviorSubject<any>({});
  existingProfs: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private url = 'https://asesprechstunde.herokuapp.com/api/lecturers';

  constructor (private http: Http) {
    this.getAllProfs();
  }

  // Get all lecturers
 getAllProfs() {
    let profsArray = [];
    this.http.get(this.url).subscribe(data => {
      for(let i = 0; i < data.json().length; i++) {
        profsArray.push(data.json()[i]);
      }
      this.existingProfs.next(profsArray);
    });
  }
}
