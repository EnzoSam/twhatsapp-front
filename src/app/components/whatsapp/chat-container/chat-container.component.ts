import { Component,  OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { routesParams } from 'src/app/constants/routes.contants';
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
  contactId:any;

  constructor(private _chatService:ChatService,
    private _activateRoute:ActivatedRoute)
  {
  }

  ngOnInit(): void {
    
    if(this._activateRoute.snapshot.paramMap.has(routesParams.contactId))
    {      
        this._activateRoute.params.subscribe(params=>{
          let id = params[routesParams.contactId];
          if(id && id !== '')
          {
              this.contactId = id;             
              //this.chat = this._chatService.getContactsChats(this.contactId, this._chatService.getCurrentChatList());
              //console.log(this.chat);
              this.chatSubscription = this._chatService.onCahtsChange          
              ().subscribe(_chats=>
                {
                    this.chat = this._chatService.getContactsChats(this.contactId, _chats);
                });          
          }  
          else
          {
            this.chat = undefined;
          }        
        })


    } 
  }

  ngOnDestroy(): void {
    if(this.chatSubscription)
      this.chatSubscription.unsubscribe();
  }


}
