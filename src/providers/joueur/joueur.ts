import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the JoueurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class Joueur {
  pseudo: String="Player";
  image: String="";
  etat: String="survivor";//ex: survivor, traitor, murderer ...
  points: number=3;
  prev_points: number=0;
  vote: String="B";//Dernier vote du joueur, A=ally, B=betray

  constructor(pseudo: String, image: String) {
    this.pseudo=pseudo;
    this.image=image;
    this.points=3;
    this.etat="survivor";
  }

}
