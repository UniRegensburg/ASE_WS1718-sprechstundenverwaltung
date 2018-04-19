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
  private partnerName: string;

  constructor(private notesService: NotesService, private userService: UserService) {

    // Check which role logged in user has
    let userRole = userService.loggedInUserInfo.getValue()[0].role;

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

          if(userRole == 'lecturer') {
            conversationPartner = data[i].student;
          }
          if(userRole == 'student') {
            conversationPartner = data[i].lecturer;
          }
          //console.log('Partner: ->>>>>>>>>>' + conversationPartner);

          // Get user name
          // Todo: Fix Bug -> somehow always same userid is saved in array
          this.userService.getUserInfoByID(conversationPartner)
            .then(res => {

              if(res != undefined) {
                this.partnerName = res[0].foreName + ' ' + res[0].lastName;

                //console.log('Pasrtner: ->>>>>>>>>>' + conversationPartner);

                // Fill array with objects
                this.conversationsArray.push({
                  convID: data[i]._id,
                  partnerID: conversationPartner,
                  partnerName: this.partnerName
                });
              }
            })
            .catch(errorMessage => console.log(errorMessage));
        }
      }
      else {
        this.conversationExists = false;
      }

    });
  }

  public openConversation(id: string) {
    confirm('blaaaaa ' + id);
  }

  ngOnInit() {
  }

}
