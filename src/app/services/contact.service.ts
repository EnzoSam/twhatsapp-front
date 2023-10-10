import { Injectable } from '@angular/core';
import { IContact } from '../models/icontact.interface';
import { ChangeService } from './change.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _changeService:ChangeService) { }

  new():IContact
  {
    return {id:'', name: ''};
  }

  newName(_id:string, _name:string):IContact
  {
    return {id:_id, name: _name};
  }

  newFromAPIObject(apiObject:any):IContact | undefined
  {
    let contact:IContact | undefined = undefined;
    if (apiObject.entry[0].changes[0].value.contacts &&
      apiObject.entry[0].changes[0].value.contacts.length > 0) {
      contact = this.newName
        (apiObject.entry[0].changes[0].value.contacts[0].wa_id,
          apiObject.entry[0].changes[0].value.contacts[0].profile.name);
    }

    if(!contact)
    {
      let change = this._changeService.newFromAPIObject(apiObject);
      if(change)
      {
        contact = this.newName(change.recipientId, change.recipientId);
      }
    }

    if (!contact && apiObject.entry[0].changes[0].value.metadata) {
      console.log('No se encontro destinatario.');
      /*
      contact = this.newName
        (apiObject.entry[0].changes[0].value.metadata.display_phone_number,
          apiObject.entry[0].changes[0].value.metadata.display_phone_number);*/
    }

    return contact;
  }
}
