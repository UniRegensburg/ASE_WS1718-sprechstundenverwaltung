import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
<<<<<<< HEAD
import { Observable } from 'rxjs/Observable';

=======
import { Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
>>>>>>> 48d1c4c... Implement BehaviorSubject/Observables in Application Services

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
  selectedProf = {id: '',name: ''};



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
      .map((res:Response) => res.json());
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
