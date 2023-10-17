import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  constructor(private _db: AngularFireDatabase) {
  }

   getCollectionRef(collectionName:string):Observable<any>
   {      
      return this._db.list(collectionName).valueChanges();
   }

   getOnceCollectionRef(collectionName:string)
   {
      return this._db.database.ref(collectionName);
   }
}
