import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfessorService {

  private url = 'https://ase1718data.herokuapp.com/professors';
  constructor (private http: Http) {
    this.fetchAllProfData();
  }
  profData = [];
  profNames = [];
  profIDs = [];
  profMails = [];
  profHours = [];
  selectedProf = {id: '', name: ''};



  _professors = [];
  professors: BehaviorSubject<any> = new BehaviorSubject<any>(this._professors);
  _selectedProfessor = {};
  selectedProfessor: BehaviorSubject<any> = new BehaviorSubject<any>(this._selectedProfessor);


  // nur zur Verdeutlichung, könnte genutzt werden, um profklasse zu optimieren
  fetchAllProfData() {
    this.http.get(this.url).subscribe(data => {
      this.professors.next(JSON.parse(data['_body']));
      console.log(this.professors.next);
    });
  }

  getAllProfData() {
    return this.http
      .get(this.url)
      .map((res: Response) => res.json());
  }

  getProfNames() {
    this.getAllProfData().subscribe(data => this.profData = data );
    for (let i = 0; i < this.profData.length; i++) {
      this.profNames.push(this.profData[i].name);
    }
    return this.profNames;
  }

  getProfIDs(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for(let i = 0; i < this.profData.length; i++) {
      this.profIDs.push(this.profData[i].id);
    }
    return this.profIDs;
  }

  getProfHours(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for (let i = 0; i < this.profData.length; i++) {
      this.profHours.push(this.profData[i].officeHours);
    }
    return this.profHours;
  }

  getProfMails(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for (let i = 0; i < this.profData.length; i++) {
      this.profMails.push(this.profData[i].email);
    }
    return this.profMails;
  }


  setSelectedProf(name) {
    this.selectedProf.name = name;
    this.selectedProf.id = this.getProfIDs()[this.getProfNames().indexOf(name)];
    this.selectedProfessor.next(this.selectedProf.id);
  }

}
