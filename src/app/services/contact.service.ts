import { Injectable } from '@angular/core';
import { IContact } from '../models/icontact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  new():IContact
  {
    return {name: ''};
  }

  newName(_name:string):IContact
  {
    return {name: _name};
  }
}
