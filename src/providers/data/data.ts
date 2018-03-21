import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class Data {

  urlList: string[];

  constructor(public storage: Storage) {
    this.urlList = [];

  }

  get(){
    this.storage.get('url').then(val => {
      this.urlList = val;
    });
  }

  save(){
    this.storage.set('url', this.urlList);
  }
}
