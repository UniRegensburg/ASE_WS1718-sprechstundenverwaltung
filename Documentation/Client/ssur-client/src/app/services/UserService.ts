import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  userRole: string;
  loggedinUser: BehaviorSubject<string> = new BehaviorSubject<string>(this.userRole);

  constructor() {
    this.loggedinUser.next('Professor');
  }

}
