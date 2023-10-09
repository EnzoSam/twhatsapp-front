import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  db: AngularFireDatabase;

  constructor(private _db: AngularFireDatabase) {

    this.db = _db;
  }

   getCollectionRef(collectionName:string):Observable<any>
   {
      return this.db.list(collectionName).valueChanges();
   }
}
