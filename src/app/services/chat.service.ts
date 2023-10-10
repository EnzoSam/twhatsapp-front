import { Injectable, OnDestroy } from '@angular/core';
import { IChat } from '../models/ichat.interface';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MessagesService } from './messages.service';
import { ContactService } from './contact.service';
import { IContact } from '../models/icontact.interface';
import { IMessage } from '../models/imessage.interface';
import { ChangeService } from './change.service';
import { IChange } from '../models/ichange.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  messagesSubscription?: Subscription;
  private chats: any = new BehaviorSubject<IChat[]>([]);

  constructor(private _messagesService: MessagesService,
    private _contactService: ContactService,
    private _changeService: ChangeService) {

    this.messagesSubscription = this._messagesService.getMessagesRef
      ().subscribe(values => {
        this.processMessagesChanges(values);
      });

  }

  onCahtsChange(): Observable<IChat[]> {
    return this.chats.asObservable()
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription)
      this.messagesSubscription.unsubscribe();
  }

  processMessagesChanges(messagesRef: any): IChat[] {
    let listChat: IChat[] = [];

    let contacts = this._contactService.getListContactFormAPIObject(messagesRef);

    for (let m of messagesRef) {
      let contact: IContact | undefined = this._contactService.newFromAPIObject(m);
      let changeNoty: IChange | undefined = this._changeService.newFromAPIObject(m);
      let message1: IMessage | undefined = this._messagesService.newFromAPIObject(m);

      if (!contact) {
        contact = this._contactService.new();
      }

      let chat = listChat.find(c => c.contact.id === contact?.id);
      if (!chat) {

        let contactUnif = contacts.find(c=>c.id === contact?.id);
        if(contactUnif)
        {
          chat = this.newChat(contactUnif);
          listChat.push(chat);
        }
      }

      if (!message1 && changeNoty && chat) {
        let m = chat.messages.find(m => m.id == changeNoty?.id);
        if (!m) {
          message1 = this._messagesService.newMessage
            (changeNoty.id, contact, "Mensaje desde api", changeNoty.date, []);
        }
        else
        {
          message1 = m;
        }
      }

      if (message1 && chat) {
        if (changeNoty) 
          message1.changes.push(changeNoty);

        let m = chat.messages.find(m => m.id == message1?.id);
        if(!m)
          chat.messages.push(message1);

        chat.lastMessage = message1;
      }
    }

    this.chats.next(listChat);

    return listChat;
  }

  newChat(_contact: IContact): IChat {
    return { contact: _contact, messages: [], lastMessage: undefined };
  }

  getContactsChats(contactId: any, chats: IChat[]): IChat | undefined {
    let contact = this._contactService.newName(contactId, '');
    let chat = this.newChat(contact);
    for (let c of chats) {
      if (c.contact.id === contactId) {
        chat = c;
        break;
      }
    }

    return chat;
  }

  getCurrentChatList(): IChat[] {
    return this.chats.getValue();
  }
}
