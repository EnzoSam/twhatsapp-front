import { Injectable, OnDestroy } from '@angular/core';
import { IChange } from '../models/ichange.interface';
import { FirebaseService } from './firebase.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IMessage } from '../models/imessage.interface';

@Injectable({
  providedIn: 'root'
})
export class ChangeService implements OnDestroy {

  changeSubscription?: Subscription;
  private changes: any = new BehaviorSubject<IChange[]>([]);

  constructor(private _firebaseService: FirebaseService) {

    this.changes.next([]);
  }

  initChangesSubscription() {
    if (!this.changeSubscription) {
      this.changeSubscription = this._firebaseService.getCollectionRef("change")
        .subscribe(changes => {
          this.processChanges(changes);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.changeSubscription)
      this.changeSubscription.unsubscribe();
  }

  getChangesObservable(): Observable<IChange[]> {
    return this.changes.asObservable()
  }

  getCurrentChanges(): IChange[] {
    return this.changes.getValue();
  }

  newChange(_id:any,_messageId: any, _status: any, _timestamp: any, 
    _recipientiId: any, _text: string, _chatId:any): IChange {
    return {
      id:_id,
      messageId: _messageId,
      status: _status,
      timestamp: _timestamp,
      recipientId: _recipientiId,
      text: _text,
      chatId:_chatId
    }
  }

  processChanges(changes: IChange[]) {
    this.changes.next(changes);
  }

  getChangesByMessageId(messageId: any): IChange[] {
    let changes = this.getChanges().filter(c => c.messageId === messageId);
    if (changes)
      return changes;
    else
      return [];
  }

  getChanges(): IChange[] {
    return this.changes.getValue();
  }

  getChatChanges(_chatid:any, _lastChangeTimestamp:any): Promise<IChange[]> {    

    return new Promise((resolve, reject) => {
      let q = this._firebaseService.getOnceCollectionRef
        ('change')
        .orderByChild('chatId')
        .equalTo(_chatid);
        if(_lastChangeTimestamp)
        {
          q = q.orderByChild('timestamp')
          .startAt(_lastChangeTimestamp)
        }
        q.once('value', snapshot => {
          if (snapshot.val()) {
            let changes: IChange[] = [];
            snapshot.forEach(m => {
              changes.push(this.newChange
                (m.val().id,
                  m.val().messageId,
                  m.val().status,
                  m.val().timestamp,
                  m.val().recipientId,
                  m.val().text,
                  m.val().chatId));
            });

            resolve(changes);
          }
        });
    });
  }  
}
