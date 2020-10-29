import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Words } from '../modules/words';



@Injectable({
  providedIn: 'root'
})
export class WordsFireService {

  private dbPath = '/words';
  fireRef = this.db.list(this.dbPath);
  wordsRef: AngularFireList<Words> = null;
  constructor(private db: AngularFireDatabase) {
  }

  getAll(): AngularFireList<Words> {
    this.wordsRef = this.db.list(this.dbPath, data => data.orderByChild('status').equalTo(0).limitToFirst(20));
    return this.wordsRef;
  }


  getStatus(value ?: number | 0): AngularFireList<Words> {
    // tslint:disable-next-line: no-bitwise
    return this.db.list(this.dbPath, data => data.orderByChild('status').equalTo(value | 0).limitToFirst(20));
  }

  getFavorite(): AngularFireList<Words> {
    return this.db.list(this.dbPath, data => data.orderByChild('favorite').equalTo(1));
  }

  update(key: any, value: any): any {
    //  this.db.list(this.dbPath).update({'status': 1})
    return this.wordsRef.update(key, value);
  }



}
