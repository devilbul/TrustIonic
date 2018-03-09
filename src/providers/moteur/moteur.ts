import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePage } from '../../pages/change/change'
import { Event } from '../../classes/Event';

import { Joueur } from '../../providers/joueur/joueur';
/*
  Generated class for the MoteurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoteurProvider {
  round: any=[];//Liste des events ayant lieu dans ce tour et des joueurs associés
  battles: any[]=[];//Liste des duel de joueurs
  duo: number[]=[];//Duo de joueur devant joueur ensemble lors d'un tour
  ID_DUO: number=10;
  players: Joueur[]=[];//Liste des joueurs
  event_list: Event[]=[];//Liste de tous les events possibles
  index_round: number=0;//Index indiquant à quel event du tour nous sommes
  index_battles: number= 0;//Index indiquant à quel affrontement des battles nous sommes
  ally_reward: number=2;//Gain si double Ally
  betray_reward: number=3;//Gain si Betray contre Ally
  betray_penalty: number=-1;//Perte si Ally contre Betray


  constructor(public http: HttpClient) {
    this.GenerateRound();
    this.GenerateJoueurs();
    this.GenerateEvent();
    this.GenerateBattles();
    this.players[1].points=4;
    console.log('Hello MoteurProvider Provider');
  }

  GenerateRound(){
    this.round=[[2,2],[1,2],[5,2],[0,2],[3,2],[4,2]];
  }

  GenerateBattles(){
    this.battles=[[0,1],[2,3],[4,5]];
  }

  GetPlayer(index: number){
    return this.players[index];
  }

  GenerateJoueurs(){
      //var joueur = new Joueur("Joueur "+i,"https://api.adorable.io/avatars/228/joueur"+i);
      this.players.push(new Joueur("Ethan ","https://api.adorable.io/avatars/228/Ethan"));
      this.players.push(new Joueur("Romain ","https://api.adorable.io/avatars/228/Romain"));
      this.players.push(new Joueur("Ludo ","https://api.adorable.io/avatars/228/Ludo"));
      this.players.push(new Joueur("Elouan ","https://api.adorable.io/avatars/228/Eloluan"));
      this.players.push(new Joueur("Jean","https://api.adorable.io/avatars/228/Jean"));
      this.players.push(new Joueur("Roger ","https://api.adorable.io/avatars/228/Rooger"));

  }

  GenerateEvent(){
    /*0*/this.event_list.push(new Event(
      "Regain",
      ["Vous gagnez un point"],
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Up_Hand_Sign_Emoji_large.png?v=1480481047"));

    /*1*/this.event_list.push(new Event(
      "Dépréciation",
      ["Vous perdez un point"],
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_large.png?v=1513336434"));

    /*2*/this.event_list.push(new Event(
      "RAS",
      ["Rien à signaler"],
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Tauchzeichen-Okay-Diving-Sign-Okay.png"));

      /*Exemple:
      this.event_list.push(new Event(
      "Folie Meurtrière",
      [
        "Nouvelle condition de victoire:",
        "Faites tomber les points d'un joueur à 0 pour gagner.",
        "Vous perdrez en cas d'évasion normale."
      ],
      "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F231d1da5-daf4-30d6-a3a1-e895505ccc42.jpg?crop=1500%2C1000%2C0%2C0&resize=685"));
      */

  }

  GestionEvent(id_joueur: number,id_event: number){
    switch(id_event){
      case 0://Regain
      this.players[id_joueur].points+=1;
      break;
      case 1://Dépréciation
      this.players[id_joueur].points-=1;
      break;
      case 2://RAS

      break;

      default:
        console.log("Deso pas deso, l'event a pas chargé");
    }
  }

  WhatNext(){
    if(this.index_round+1>this.round.length){//si fin de tour event
      return "debate";
    }
    else{
      return "event";
    }
  }

  NextStep(){
    this.index_round=(this.index_round+1)%(this.round.length);
  }


}
