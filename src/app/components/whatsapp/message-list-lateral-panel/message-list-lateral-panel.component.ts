import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IChat } from 'src/app/models/ichat.interface';
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

  constructor(private _chatServices:ChatService)
  {
    this.chats = [];
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
