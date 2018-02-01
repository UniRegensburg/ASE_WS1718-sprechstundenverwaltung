import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ProfessorService} from "../services/ProfessorService";
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-professor-selector',
  templateUrl: './professor-selector.component.html',
  styleUrls: ['./professor-selector.component.css']
})

export class ProfessorSelectorComponent {

  constructor(private professorService: ProfessorService) {
    this.profCtrl = new FormControl();
    this.filteredProfs = this.profCtrl.valueChanges
      .pipe(
        startWith(''),
        map(prof => prof ? this.filterProfs(prof) : this.profs.slice())
      );
  }

  profObjects = [];
  profCtrl: FormControl;
  filteredProfs: Observable<any[]>;
  profs = [];

  filterProfs(name: string) {
    return this.profs.filter(prof =>+
      prof.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  loadProfs() {
    this.professorService.getProfs().subscribe(data => this.profObjects = data);
    for (var i = 0; i < this.profObjects.length; i++) {
      this.profs.push(this.profObjects[i].name + ", " + this.profObjects[i].prename);}
  }

  getSelectedProf(){
    return this.profCtrl.value();
  }
}
