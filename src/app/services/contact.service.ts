import { Injectable } from '@angular/core';
import { IContact } from '../models/icontact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  new():IContact
  {
    return {id:'', name: ''};
  }

  newName(_id:string, _name:string):IContact
  {
    return {id:_id, name: _name};
  }
}
