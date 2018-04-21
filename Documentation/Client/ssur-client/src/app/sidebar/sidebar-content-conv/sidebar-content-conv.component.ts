import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-sidebar-content-conversation',
  templateUrl: './sidebar-content-conv.component.html',
  styleUrls: ['./sidebar-content-conv.component.css']
})
export class SidebarContentConvComponent implements OnInit {

  public title_sidebar = 'Ihre Unterhaltungen:';
  private notesListener;
  public conversationsArray = [];
  public conversationExists = false;
  public userRole: string;

  constructor(private notesService: NotesService, private userService: UserService) {

    // Check which role logged in user has
    this.userRole = userService.loggedInUserInfo.getValue()[0].role;

    // Request conversations of logged in user
    notesService.getConversations(userService.loggedInUserInfo.getValue()[0]._id, userService.loggedInUserInfo.getValue()[0].role);

    // Get conversations
    this.notesListener = notesService.Conversations.subscribe(data => {

      let conversationPartner: string;

      // Check if entry exists
      if(data.length > 0) {

        this.conversationExists = true;

        // Iterate through each conversation in data-array
        for(let i = 0; i < data.length; i++) {

          if(this.userRole == 'lecturer') {
            conversationPartner = data[i].student;
          }
          if(this.userRole == 'student') {
            conversationPartner = data[i].lecturer;
          }

          // Fill array with objects
          this.conversationsArray.push({
            convID: data[i]._id,
            partnerID: conversationPartner,
            partnerName: ''
          });

          // When array is filled, execute function to fill in usernames
          if(i == data.length - 1) {
            this.fillInNames();
          }
        }
      }
      else {
        this.conversationExists = false;
      }
    });
  }

  private fillInNames() {

    let partnerName: string;

    for(let i = 0; i < this.conversationsArray.length; i++) {
      this.userService.getUserInfoByID(this.conversationsArray[i].partnerID)
        .then(data => {
          if(data != undefined) {
            partnerName = data[0].foreName + ' ' + data[0].lastName;
            this.conversationsArray[i].partnerName = partnerName;
          }
        })
        .catch(errorMessage => console.log(errorMessage));
    }
  }

  openNotesDialog(convID) {

  }

  ngOnInit() {}
}
