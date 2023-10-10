import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from './base-service.service';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { IContact } from '../models/icontact.interface';
import { IMessage } from '../models/imessage.interface';
import { ContactService } from './contact.service';
import { IChange } from '../models/ichange.interface';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseServiceService {

  messagesRef: Observable<any>;

  constructor(protected override _http: HttpClient,
    private _firebaseService: FirebaseService,
    private _contactService: ContactService) {
    super(_http);
    this.defaultApiNameSpace = "messages";
    this.messagesRef = _firebaseService.getCollectionRef('messages');
  }

  getMessagesRef(): Observable<any> {
    return this.messagesRef;
  }

  new(): IMessage {
    return { 
      id:'', 
      contact: this._contactService.new(), 
      text: '', 
      date: new Date(),
      changes:[] };
  }

  newMessage(_id:any, _contact: IContact | undefined, _text: string, _date: Date, _changes:IChange[]): IMessage {
    return { 
      id:_id,
      contact: _contact, 
      text: _text, 
      date: _date, 
      changes:_changes
    };
  }

  newFromAPIObject(apiObject: any):IMessage | undefined {

    let message: IMessage | undefined = undefined;

    try{
    if (apiObject.entry.length > 0 && apiObject.entry[0].changes.length > 0 &&
      apiObject.entry[0].changes[0].value &&
      apiObject.entry[0].changes[0].value.messages &&
      apiObject.entry[0].changes[0].value.messages.length > 0) {
      message = this.newMessage
        (apiObject.entry[0].changes[0].value.messages[0].id,
          undefined, apiObject.entry[0].changes[0].value.messages[0].text.body,
          new Date(+apiObject.entry[0].changes[0].value.messages[0].timestamp * 1000),[]);

      let contact = this._contactService.newFromAPIObject(apiObject);
      message.contact = contact;
    }
  }
  catch(ex)
  {
    //console.log(ex);
  }

    return message;
  }

  getStatusView(_status:string):string
  {
    if(_status === 'sent')
      return 'Enviado';
    else if(_status === 'delivered')
      return 'Entregado';
    else if(_status === 'read')
      return 'Leido';    
    else
      return _status;
  }
}
