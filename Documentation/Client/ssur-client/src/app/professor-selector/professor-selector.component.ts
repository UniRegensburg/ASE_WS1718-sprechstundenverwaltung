import {Component, OnInit} from '@angular/core';
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

export class ProfessorSelectorComponent implements OnInit {
  profCtrl: FormControl;
  profsArray = [];
  filteredProfs: Observable<string[]>;
  profsListener;

  constructor(private professorService: ProfessorService) {
    this.profCtrl = new FormControl();
    this.profsListener = professorService.existingProfs.subscribe(data => {

      // Check if array is filled
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const completeName = data[i].foreName + ' ' + data[i].lastName;
          this.profsArray.push({
            id: data[i]._id,
            name: completeName
          });
        }
      }
      this.filteredProfs = this.profCtrl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterProfs(val))
        );
    });
  }

  ngOnInit() {
  }

  clearSelection() {
    // clear input
    this.profCtrl.setValue('');
    // Todo: show options without the need to click outside of input field first
  }

  filterProfs(val: string): string[] {
    const dummyArray = [];
    for (let i = 0; i < this.profsArray.length; i++) {
      dummyArray.push(this.profsArray[i].name);
    }
    return dummyArray.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  sendSelectedProfID() {
    for (let i = 0; i < this.profsArray.length; i++) {
      if (this.profsArray[i].name === this.profCtrl.value) {
        this.professorService.selectedProfessor.next(this.profsArray[i].id);
      }
    }
  }
}
