import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfessorService {
  constructor (
    private http: Http
  ) {}

  getProfs() {
    return this.http.get(`https://ase1718data.herokuapp.com/professors`)
      .map((res:Response) => res.json());
  }
}
