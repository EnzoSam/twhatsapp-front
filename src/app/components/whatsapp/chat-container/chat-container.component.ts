import { Component,  OnDestroy, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { routesParams } from 'src/app/constants/routes.contants';
import { IChat } from 'src/app/models/ichat.interface';
import { IContact } from 'src/app/models/icontact.interface';
import { ChatService } from 'src/app/services/chat.service';
import { MessagesService } from 'src/app/services/messages.service';

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
    private _activateRoute:ActivatedRoute,
    private _messageService:MessagesService,
    private app: AppComponent)
  {
    window.addEventListener('popstate', () => {
      console.log("atrassss");
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    const scrollableDiv = document.getElementById('aaa1');
    if (scrollableDiv) {
      scrollableDiv.scrollLeft = scrollableDiv.scrollTop;
    }
  }

  ngOnInit(): void {
    
    if(this._activateRoute.snapshot.paramMap.has(routesParams.contactId))
    {      
        this._activateRoute.params.subscribe(params=>{
          let id = params[routesParams.contactId];          
          if(id && id !== '')
          {
              this.contactId = id;  
                   
              this.chat = this._chatService.getChat(this.contactId);                   
              if(this.chat)
                this.loadChat(this.contactId);                   
              this.chatSubscription = this._chatService.onCahtsChange          
              ().subscribe(_chats=>
                {                  
                    this.chat = this._chatService.getChat(this.contactId);     
                    if(this.chat)
                      this.loadChat(this.contactId);        
                });          
          }  
          else
          {
            this.chat = undefined;
          }        
        })


    } 
  }

  loadChat(_contactId:any)
  {        
    this.chat = this._chatService.getChat(_contactId);
    if(this.chat)
      this._chatService.loadChats([this.chat]).then(chats=>
    {

    }) 
  }

  ngOnDestroy(): void {
    if(this.chatSubscription)
      this.chatSubscription.unsubscribe();
  }
}