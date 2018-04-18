import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class FileUploadService {

  constructor(
    private http: Http
  ) { }

  // todo: use url of the conversation
  postFile(fileToUpload): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData)
      .map(() => { return true; })
     // .catch((e) => this.handleError(e));
  }


}

