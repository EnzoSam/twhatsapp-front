import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IChat } from 'src/app/models/ichat.interface';
import { IContact } from 'src/app/models/icontact.interface';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css']
})
export class ChatContainerComponent implements OnInit, OnDestroy {

  chatSubscription?: Subscription;
  chat?:IChat;
  @Input() contact?:IContact

  constructor(private _chatService:ChatService)
  {
  }

  ngOnInit(): void {
    this.chatSubscription = this._chatService.onCahtsChange
    ().subscribe(_chats=>
      {
        if(this.contact)
          this.chat = this._chatService.getContactsChats(this.contact, _chats);
      });
  }

  ngOnDestroy(): void {
    if(this.chatSubscription)
      this.chatSubscription.unsubscribe();
  }


}
