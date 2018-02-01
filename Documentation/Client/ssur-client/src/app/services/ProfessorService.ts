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
<<<<<<< HEAD
  selectedProf = {id: '',name: ''};

=======
  selectedProf = {id: '', name: ''};
>>>>>>> calendarBranch


  _professors = [];
  professors: BehaviorSubject<any> = new BehaviorSubject<any>(this._professors);
  // ================================================
  _selectedProfessor = {};
  selectedProfessor: BehaviorSubject<any> = new BehaviorSubject<any>(this._selectedProfessor);


  // nur zur Verdeutlichung, könnte genutzt werden, um profklasse zu optimieren
  fetchAllProfData() {
    this.http.get(this.url).subscribe(data => {
      console.log("\n\n\n\n====================\nget all prof data");
      //console.log(JSON.parse(data._body));
      this.professors.next(JSON.parse(data["_body"]));
    });
  }





  getAllProfData() {
    return this.http
      .get(this.url)
<<<<<<< HEAD
      .map((res:Response) => res.json());
=======
      .map((res: Response) => res.json());
  }

  getProfNames() {
    this.getAllProfData().subscribe(data => this.profData = data );
    for (var i = 0; i<this.profData.length; i++){
      this.profNames.push(this.profData[i].name);
    }
    return this.profNames;
  }

  getProfIDs(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for(var i = 0; i < this.profData.length; i++) {
      this.profIDs.push(this.profData[i].id);
    }
    return this.profIDs;
  }

  getProfHours(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for(var i = 0; i < this.profData.length; i++) {
      this.profHours.push(this.profData[i].officeHours);
    }
    return this.profHours;
  }

  getProfMails(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for(var i = 0; i < this.profData.length; i++) {
      this.profMails.push(this.profData[i].email);
      console.log(this.profMails);
    }
    return this.profMails;
  }

 /* simpleObservable = new Observable((observer) => {

    // observable execution
    observer.next("bla bla bla")
    observer.complete()
  })*/

  setSelectedProf(name) {
    this.selectedProf.name = name; //todo:slice selected value'fullname' into prename and name again
    console.log(this.selectedProf.name);
    this.selectedProf.id = this.getProfIDs()[this.getProfNames().indexOf(name)];
    console.log(this.selectedProf.id);

    // ================================================
    this.selectedProfessor.next(this.selectedProf.id);
  }

  getSelectedProf() {
    console.log(this.selectedProf.id);
    return this.selectedProf.id;
>>>>>>> calendarBranch
  }

  getProfNames(){
    this.getAllProfData().subscribe(data => this.profData = data );
    for (var i = 0; i<this.profData.length; i++){
      this.profNames.push(this.profData[i].name);
    }
    return this.profNames;
  }

  getProfIDs(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for(var i = 0; i<this.profData.length; i++){
      this.profIDs.push(this.profData[i].id);
    }
    return this.profIDs;
  }

  getProfHours(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for(var i = 0; i<this.profData.length; i++){
      this.profHours.push(this.profData[i].officeHours);
    }
    return this.profHours;
  }

  getProfMails(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for(var i = 0; i<this.profData.length; i++){
      this.profMails.push(this.profData[i].email);
      console.log(this.profMails);
    }
    return this.profMails;
  }


  setSelectedProf(name){
    this.selectedProf.name = name; //todo:slice selected value'fullname' into prename and name again
    this.selectedProf.id = this.getProfIDs()[this.getProfNames().indexOf(name)];

    // ================================================
    this.selectedProfessor.next(this.selectedProf.id);
  }

  getSelectedProf(){
    return this.selectedProf.id;
  }

}
