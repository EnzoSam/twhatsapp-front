import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppSate } from '../models/appState.interface';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  
  private firstLoad = true;
  private appState: any = new BehaviorSubject<IAppSate>({ready:false});

  constructor() { 

  }

  getObservableState():Observable<IAppSate>
  {
      return this.appState.asObservable();
  }


  isFistLoad():boolean
  {
    return this.firstLoad;
  }

  markAsLoaded():void
  {
    this.firstLoad = false;
    this.appState.next({ready:true});
    console.log('aaaaaaaaaaaaa');
  }
}
