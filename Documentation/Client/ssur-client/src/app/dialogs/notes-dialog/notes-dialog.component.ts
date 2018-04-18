import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FileUploadService} from '../../services/file-upload.service';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.css'],
  providers: [FileUploadService]
})
export class NotesDialogComponent implements OnInit {
  fileToUpload: File = null;

  constructor(
    public dialogRef: MatDialogRef<NotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
      this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error + 'Upload fehlgeschlagen!');
    });
  }

}
