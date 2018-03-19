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
  etat: String="";//ex: survivor, traitor, follower ...
  following: number;//ID du traitre suivi si ce joueur est un follower
  points: number=3;
  prev_points: number=0;
  vote: String="B";//Dernier vote du joueur, A=ally, B=betray
  buff: String="";//Si le joueur subbit un effet particulier

  constructor(pseudo: String, image: String) {
    this.pseudo=pseudo;
    this.image=image;
    this.points=3;
  }

}
