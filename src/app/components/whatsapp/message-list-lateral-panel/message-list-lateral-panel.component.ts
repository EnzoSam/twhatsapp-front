import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { routesPaths } from 'src/app/constants/routes.contants';
import { IChat } from 'src/app/models/ichat.interface';
import { IContact } from 'src/app/models/icontact.interface';
import { ChatService } from 'src/app/services/chat.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-message-list-lateral-panel',
  templateUrl: './message-list-lateral-panel.component.html',
  styleUrls: ['./message-list-lateral-panel.component.css']
})
export class MessageListLateralPanelComponent implements OnInit, OnDestroy{

  chats:IChat[];
  chatSubscription?: Subscription;
  routes:any;
  contacts:IContact[];

  constructor(private _chatServices:ChatService)
  {
    this.routes = routesPaths;
    this.chats = [];
    this.contacts = [];
  }

  ngOnDestroy(): void {
    if(this.chatSubscription)
      this.chatSubscription.unsubscribe();
  }

  ngOnInit(): void {this._chatServices.onCahtsChange
    ().subscribe(_chats=>
      {
        this.chats = _chats;

      });
  }


}
