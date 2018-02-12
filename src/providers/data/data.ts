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
  playerList: any;
  constructor(public http: HttpClient, public storage: Storage) {
    this.http = http;
    this.playerList = [];
  }

  getPlayerList(): Observable<any>{
    if(this.playerList.length == 0) {
      return Observable.fromPromise(this.storage.get('playerList')).mergeMap( (val: any) => {
          if(val == null || val.feed == null) {
            return this.http.get("assets/data.json").pipe(
              tap( (res: any) => {
                this.playerList = res.player;
              })
            );
          }
          else {
            this.playerList = val.player;
            return of({ feed:this.playerList });
          }
        });
    }
    else {
      return of({ player:this.playerList });
    }
    
  }
  
  addPlayerToList(player) {
    this.playerList.push(player);
    this.savePlayerToList();
}

  savePlayerToList() {
    this.storage.set('playerList', {"player": this.playerList});
  }

} 
