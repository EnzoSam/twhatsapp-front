import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { routesPaths } from 'src/app/constants/routes.contants';
import { IChat } from 'src/app/models/ichat.interface';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-message-item-list',
  templateUrl: './message-item-list.component.html',
  styleUrls: ['./message-item-list.component.css']
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
}
