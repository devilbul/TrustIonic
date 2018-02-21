import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the JoueurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JoueurProvider {
  pseudo: String="Player";
  image: String=""
  etat: String="survivor";//ex: survivor, traitor, murderer ...
  points: number=3;

  constructor(pseudo: String, image: String) {
    console.log('Hello JoueurProvider Provider');
    this.pseudo=pseudo;
    this.image=image;
    this.points=3;
    this.etat="survivor";
  }

}
