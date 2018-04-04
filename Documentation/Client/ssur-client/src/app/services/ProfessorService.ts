import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfessorService {

  selectedProfessor: BehaviorSubject<any> = new BehaviorSubject<any>({});
  //public existingProfs = [];
  existingProfs: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private url = 'https://asesprechstunde.herokuapp.com/api/lecturers';

  constructor (private http: Http) {
    this.getAllProfs();
  }

  // Get all lecturers
 getAllProfs() {
    var profsArray = [];
    this.http.get(this.url).subscribe(data => {
      for(var i = 0; i < data.json().length; i++) {
        //console.log('profsanzahl----->' + data.json()[i].foreName);
        profsArray.push(data.json()[i]);
      }
      this.existingProfs.next(profsArray);
    });
  }
}
