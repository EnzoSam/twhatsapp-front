import { Injectable, OnDestroy } from '@angular/core';
import { IChat } from '../models/ichat.interface';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MessagesService } from './messages.service';
import { ContactService } from './contact.service';
import { IContact } from '../models/icontact.interface';
import { IMessage } from '../models/imessage.interface';
import { ChangeService } from './change.service';
import { IChange } from '../models/ichange.interface';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  chatSubscription?: Subscription;

  messagesSubscription?: Subscription;
  changesChanges?: Subscription;
  messagesChanges?: Subscription;
  private chats: any = new BehaviorSubject<IChat[]>([]);

  constructor(private _firebaseService: FirebaseService,
    private _contactService: ContactService,
    private _changeService: ChangeService,
    private _messagesService: MessagesService) {

    this.chats.next([]);

    this.chatSubscription = this._firebaseService.getCollectionRef('chat')
      .subscribe(values => {
        this.procesChatChanges(values);
      });
  }

  initChangesSubscription() {
    if (!this.changesChanges) {
      //this._changeService.initChangesSubscription();

      /*
      this.changesChanges = this._changeService.getChangesObservable()
        .subscribe(changes => {          
          this.setChanges(this.getCurrentChatList(), changes);
        });*/
    }
  }

  onCahtsChange(): Observable<IChat[]> {
    return this.chats.asObservable()
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription)
      this.messagesSubscription.unsubscribe();
    if (this.chatSubscription)
      this.chatSubscription.unsubscribe();
    if (this.changesChanges)
      this.changesChanges.unsubscribe();
  }

  loadChats(chats: IChat[]): Promise<IChat[]> {
    return new Promise((resolve, reject) => {
      let chatsReturn: IChat[] = [];
      for (let c of chats) {
        let contact = this._contactService.getContactById(c.contactId);
        let chat = this.newChat(contact);
        chat.id = c.id;
        chat.lastChangeId = c.lastChangeId;
        chatsReturn.push(chat);
      }

      this.loadMessages(chatsReturn)
        .then(chatsLoads => {
          this.loadChanges(chatsLoads)
            .then(_chatsWithChanges => {

              for (let c of _chatsWithChanges) {
                c.messages.sort((a, b) => {
                  return a.timestamp - b.timestamp;
                })
              }

              resolve(_chatsWithChanges);
            });
        })
    });
  }

  procesChatChanges(chats: any) {

    this.loadChats(chats).then(chatsLoads => {
      this.chats.next(chatsLoads);
      this.initChangesSubscription();
    })
  }

  loadChanges(_chats: IChat[]): Promise<IChat[]> {
    return new Promise((resolve, reject) => {
      try {
        for (let c of _chats) {

          if (!c.id)
            continue;

          this._changeService.getChatChanges(c.id, c.lastChangeTimestamp)
            .then((changes: IChange[]) => {

              for (let change of changes) {
                let messageFinded = c.messages.find(m => m.id === change.messageId);
                if (!messageFinded) {
                  c.messages.push(this._messagesService.newMessage
                    (change.messageId, c.id, 'Mensaje desde API', [], 
                    change.timestamp, 'text', true));
                }
              }

              for (let message of c.messages) {
                let messageChanges = changes.filter
                  (c => c.messageId === message.id);
                messageChanges.forEach(mc => {
                  if (c.lastChangeId && c.lastChangeId === mc.id) {
                    c.lastMessage = message;
                  }
                  this._messagesService.addChange(message, mc);
                });
              }

              resolve(_chats);
            }).catch(err => {
              reject(err);
            });
        }
      }
      catch (ex) {
        reject(ex);
      }
    });
  }

  loadMessages(chat: IChat[]): Promise<IChat[]> {
    return new Promise((resolve, reject) => {
      try {
        for (let c of chat) {
          this._messagesService.getMessagesByChat(c.id)
            .then((m: IMessage[]) => {
              if (m)
              {
                c.messages = m;
              }
              else
              {
                c.messages = [];
              }
            });
        }
        resolve(chat);
      }
      catch (ex) {
        reject(ex);
      }
    });
  }

  extratMessagesIds(_chages: IChange[]): any[] {
    let messagesIds: any[] =
      [...new Set(_chages.map(c => c.messageId))];
    return messagesIds;
  }

  extratChatssIds(_chages: IMessage[]): any[] {
    let messagesIds: any[] =
      [...new Set(_chages.map(c => c.chatId))];
    return messagesIds;
  }

  newChat(_contact: IContact): IChat {

    return {
      id: '',
      contactId: _contact.id,
      contact: _contact,
      messages: [],
      noReadsMessages: 0,
      lastChangeId: undefined,
      lastMessage: undefined
    }
  }

  getCurrentChatList(): IChat[] {
    let l = this.chats.getValue();
    return l;
  }

  getChat(contactId: any): IChat | undefined {
    let chat = this.getCurrentChatList().find(c => c.contactId === contactId);
    return chat;
  }

  getNoReadedMessages(chat: IChat): number {
    let noReaded = 0;

    for (let m of chat.messages) {
      if (!this._messagesService.wasReaded(m))
        noReaded++;
    }

    return noReaded;
  }
}
