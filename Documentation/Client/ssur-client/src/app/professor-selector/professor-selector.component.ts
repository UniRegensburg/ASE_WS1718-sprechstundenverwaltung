import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ProfessorService} from '../services/ProfessorService';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


@Component({
  selector: 'app-professor-selector',
  templateUrl: './professor-selector.component.html',
  styleUrls: ['./professor-selector.component.css'],
  providers: []
})

export class ProfessorSelectorComponent implements OnInit{
  profCtrl: FormControl;
  profsArray = [];
  filteredProfs: Observable<string[]>;

  constructor(private professorService: ProfessorService) {
    this.profCtrl = new FormControl();

    for(var i = 0; i < this.professorService.existingProfs.length; i++) {
      var completeName = this.professorService.existingProfs[i].name + ' ' + this.professorService.existingProfs[i].lastName;
      this.profsArray.push({
        id: this.professorService.existingProfs[i]._id,
        name: completeName
      });
    }

    this.filteredProfs = this.profCtrl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterProfs(val))
      );
  }

  ngOnInit(){
  }

  filterProfs(val: string): string[] {
    var dummyArray = [];
    for(var i = 0; i < this.profsArray.length; i++) {
      dummyArray.push(this.profsArray[i].name);
    }
    return dummyArray.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  sendSelectedProfID(){
    for(var i = 0; i < this.profsArray.length; i++) {
      if(this.profsArray[i].name == this.profCtrl.value) {
        this.professorService.setSelectedProf(this.profsArray[i].id);
      }
    }

  }
}
