import { Injectable, OnDestroy } from '@angular/core';
import { IChat } from '../models/ichat.interface';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MessagesService } from './messages.service';
import { ContactService } from './contact.service';
import { IContact } from '../models/icontact.interface';
import { IMessage } from '../models/imessage.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  messagesSubscription?: Subscription;
  private chats :any=new BehaviorSubject<IChat[]>([]);
  
  constructor(private _messagesService:MessagesService,
    private _contactService:ContactService,
    private _messageService:MessagesService) {

    this.messagesSubscription = this._messagesService.getMessagesRef
    ().subscribe(values=>
      {
          this.processMessagesChanges(values);
      });

   }

   onCahtsChange(): Observable<IChat[]>
   {
     return this.chats.asObservable()
   }

  ngOnDestroy(): void {
    if(this.messagesSubscription)
      this.messagesSubscription.unsubscribe();
  }

  processMessagesChanges(messagesRef:any):IChat[]
  {
    let listChat: IChat[] = [];

    for(let m of messagesRef)
    {
      let contact:IContact = this._contactService.new();
      if(m.entry[0].changes[0].value.contacts &&
        m.entry[0].changes[0].value.contacts.length > 0)
        {
          contact = this._contactService.newName
          (m.entry[0].changes[0].value.contacts[0].wa_id,
            m.entry[0].changes[0].value.contacts[0].profile.name);
        }


      let message :IMessage = this._messageService.new();
      if(m.entry.length > 0 && m.entry[0].changes.length > 0 &&
        m.entry[0].changes[0].value &&
        m.entry[0].changes[0].value.messages &&
        m.entry[0].changes[0].value.messages.length > 0)
        {
          message = this._messageService.newMessage
          (contact, m.entry[0].changes[0].value.messages[0].text.body,
            +m.entry[0].changes[0].value.messages[0].timestamp *1000);
        }

      let existingChat = listChat.find(x=>x.contact.id === contact.id);
      if(!existingChat)
      {
        existingChat = this.newChat(contact);
        listChat.push(existingChat);
      }

      console.log(m);
      existingChat.messages.push(message);
    }

    this.chats.next(listChat);

    return listChat;
  }

  newChat(_contact:IContact):IChat
  {
    return {contact:_contact, messages:[], lastMessage: undefined};
  }

  getContactsChats(contactId: any, chats:IChat[]):IChat|undefined
  {
    let contact = this._contactService.newName(contactId, '');
    let chat = this.newChat(contact);
    for(let c of chats)
    {
      if(c.contact.id === contactId)
      {
        chat = c;
        break;
      }
    }

    return chat;
  }

  getCurrentChatList():IChat[]
  {
    return this.chats.getValue();
  }
}
