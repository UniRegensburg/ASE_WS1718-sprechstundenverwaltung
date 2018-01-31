import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProfessorService {

  private url = 'https://ase1718data.herokuapp.com/professors';
  constructor (private http: Http) {}
  profData = [];
  profNames = [];
  profIDs = [];
  profMails = [];
  profHours = [];
  selectedProf = {id: '', prename: '', name: '', mail: ' ', officeHours: ' '};

  getAllProfData() {
    return this.http
      .get(this.url)
      .map((res:Response) => res.json());

  }

  getProfNames(){
    this.getAllProfData().subscribe(data => this.profData = data );
    for (var i = 0; i<this.profData.length; i++){
      this.profNames.push(this.profData[i].name+', '+this.profData[i].prename);
      console.log(this.profNames);
    }
    return this.profNames;
  }

  getProfIDs(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for(var i = 0; i<this.profData.length; i++){
      this.profIDs.push(this.profData[i].id);
      console.log(this.profIDs);
    }
    return this.profIDs;
  }

  getProfHours(){
    this.getAllProfData().subscribe(data => this.profData = data);
    for(var i = 0; i<this.profData.length; i++){
      this.profHours.push(this.profData[i].officeHours);
      console.log(this.profHours);
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

  //todo: implement method: should return a prof-object with all data of the selected prof in the autocomplete field
  setSelectedProf(fullname){
    this.selectedProf.name = fullname; //todo:slice selected value'fullname' into prename and name again
    console.log(this.selectedProf.name);
  //  this.selectedProf.prename = prename;
   // this.selectedProf.mail = mail;
   // this.selectedProf.officeHours = officeHours;
  }

  getSelectedProf(){
    return this.selectedProf;
  }

}
