import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from './base-service.service';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { IContact } from '../models/icontact.interface';
import { IMessage } from '../models/imessage.interface';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseServiceService{

  messagesRef:Observable<any>;
  
  constructor(protected override _http: HttpClient,
    private _firebaseService: FirebaseService,
    private _contactService:ContactService)
    {
      super(_http);
      this.defaultApiNameSpace = "messages";
      this.messagesRef =  _firebaseService.getCollectionRef('messages');
    }  

    getMessagesRef():Observable<any>
    {
      return this.messagesRef;
    }

    new():IMessage
    {
      return {contact: this._contactService.new(), text:'', date:new Date()};
    }

    newMessage(_contact:IContact, _text:string, _date:any):IMessage
    {
      return {contact: _contact, text:_text, date:_date};
    }
}
