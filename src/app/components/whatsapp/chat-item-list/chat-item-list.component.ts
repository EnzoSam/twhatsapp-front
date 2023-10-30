import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { routesPaths } from 'src/app/constants/routes.contants';
import { messageStatus } from 'src/app/constants/status.constats';
import { IChange } from 'src/app/models/ichange.interface';
import { IChat } from 'src/app/models/ichat.interface';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-item-list',
  templateUrl: './chat-item-list.component.html',
  styleUrls: ['./chat-item-list.component.css']
})
export class MessageItemListComponent {

  @Input() chat?:IChat;
  routes:any;
  
  constructor(private el: ElementRef,
    private app: AppComponent,
    private _chatService:ChatService)
  {
    this.routes = routesPaths;
  }

  scrollToBottom() {
    const scrollableDiv = document.getElementById('aaa1');
    if (scrollableDiv) {
      scrollableDiv.scrollLeft = scrollableDiv.scrollWidth;
    }
  }

  lastStatus(): string {

    if(!this.chat || !this.chat.lastMessage || !this.chat.lastMessage.changes)
      return '';

    if(this.chat.lastMessage.changes.find((c: IChange)=>c.status === messageStatus.readed))
      return  messageStatus.readed;
    else if(this.chat.lastMessage.changes.find((c: IChange)=>c.status ===messageStatus.delivered))
      return messageStatus.delivered;
    else if(this.chat.lastMessage.changes.find((c: IChange)=>c.status === messageStatus.sended))
      return messageStatus.sended;    
    else if(this.chat.lastMessage.changes.find((c: IChange)=>c.status === messageStatus.failed))
      return messageStatus.failed;    
    else
         return '';
  }
  
}
