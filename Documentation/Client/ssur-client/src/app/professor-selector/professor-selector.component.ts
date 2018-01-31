import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ProfessorService} from "../services/ProfessorService";
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


@Component({
  selector: 'app-professor-selector',
  templateUrl: './professor-selector.component.html',
  styleUrls: ['./professor-selector.component.css'],
  providers: [ProfessorService]
})

export class ProfessorSelectorComponent implements OnInit{
  profCtrl: FormControl;
  filteredProfs: Observable<any[]>;
  profs;

  constructor(private professorService: ProfessorService) {
    this.profCtrl = new FormControl();
    this.filteredProfs = this.profCtrl.valueChanges
      .pipe(
        startWith(''),
        map(prof => prof ? this.filterProfs(prof) : this.profs.slice())
      );
  }

  ngOnInit(): void {
    this.professorService.getAllProfData();
    this.profs = this.professorService.getProfNames();
    console.log(this.profs);
  }


 filterProfs(name: string) {
    return this.profs.filter(prof =>
      prof.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  //todo: implement method that sends the current selected value to professorService (observable)
  sendSelectedProf(){
    this.professorService.setSelectedProf(this.profCtrl.value);
  }
}
