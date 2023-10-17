import { Injectable, OnDestroy } from '@angular/core';
import { IContact } from '../models/icontact.interface';
import { ChangeService } from './change.service';
import { FirebaseService } from './firebase.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnDestroy{
  
  contactSubscription?: Subscription;
  private contacts: any = new BehaviorSubject<IContact[]>([]);
  
  constructor(private _changeService:ChangeService,
    private _firebaseService:FirebaseService) {

        _firebaseService.getCollectionRef('contact')
        .subscribe(contacts=>
          {
            this.processContactChanges(contacts);
          })

     }

  ngOnDestroy(): void {
    if(this.contactSubscription)
      this.contactSubscription.unsubscribe();
  }



  new():IContact
  {
    return {id:'', name: ''};
  }

  newName(_id:string, _name:string):IContact
  {
    return {id:_id, name: _name};
  }

  processContactChanges(contacts:IContact[])
  {
    this.contacts.next(contacts);
  }

  getContactById(_contactId:any):IContact
  {
    return this.contacts.getValue().find((c: IContact)=>c.id == _contactId);
  }
}
