import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from './base-service.service';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { IMessage } from '../models/imessage.interface';
import { IChange } from '../models/ichange.interface';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseServiceService implements OnDestroy {

  messagesRef: Observable<any>;

  constructor(protected override _http: HttpClient,
    private _firebaseService: FirebaseService) {
    super(_http);
    this.defaultApiNameSpace = "messages";
    this.messagesRef = _firebaseService.getCollectionRef('messages');     
  }

  ngOnDestroy(): void {

  }

  getMessagesRef(): Observable<any> {
    return this.messagesRef;
  }

  newMessage(_id: any, _chatId: any, _content: any,
    _changes: IChange[], _timestamp: any, _type: any): IMessage {

    return {
      id: _id,
      chatId: _chatId,
      content: _content,
      changes: _changes,
      timestamp: _timestamp,
      type: _type
    };
  }

  getStatusView(_status: string): string {
    if (_status === 'sent')
      return 'Enviado';
    else if (_status === 'delivered')
      return 'Entregado';
    else if (_status === 'read')
      return 'Leido';
    else
      return _status;
  }

  getMessagesByChat(chatId: any): Promise<IMessage[]> {

    return new Promise((resolve, reject) => {
      if (!chatId || chatId === '') {
        resolve([]);
        return;
      }
      this._firebaseService.getOnceCollectionRef
        ('message')
        .orderByChild('chatId')
        .equalTo(chatId)
        .once('value', snapshot => {
          if (snapshot.val()) {
            let messages: IMessage[] = [];
            snapshot.forEach(m => {
              messages.push(this.newMessage
                (m.val().id,
                  m.val().chatId,
                  m.val().content,
                  [],
                  m.val().timestamp,
                  m.val().type));
            });
            resolve(messages);
          }
        });
    });
  }

  addChange(_message:IMessage, _change:IChange)
  {
    if(!_message.changes)
      _message.changes = [];

      if(!_message.changes.find(c=>c.id === _change.id))
        _message.changes.push(_change);
  }

  downloadMessageContent(message:IMessage):Observable<any>
  {
    return this._http.get(this.apiUrl + "media/download/" + 
    message.content.documentId, { responseType: 'blob' });
  }

  wasReaded(message:IMessage):boolean
  {
    return message.changes.find(c=>c.status === 'read') != null;
  }
}
