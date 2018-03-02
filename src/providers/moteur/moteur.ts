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
  round: any=[];
  battles: number[]=[];
  players: Joueur[]=[];
  event_list: Event[]=[];
  index_round: number=0;
  ally_reward: number=2;
  betray_reward: number=3;
  betray_penalty: number=-1;
  //id_active_player: number=0;


  constructor(public http: HttpClient) {
    this.GenerateRound();
    this.GenerateJoueurs();
    this.GenerateEvent();
    console.log('Hello MoteurProvider Provider');
  }

  GenerateRound(){
    this.round=[[2,2],[1,2],[3,2],[0,2]];
  }

  GetPlayer(index: number){
    return this.players[index];
  }

  GenerateJoueurs(){
      //var joueur = new Joueur("Joueur "+i,"https://api.adorable.io/avatars/228/joueur"+i);
      this.players.push(new Joueur("Ethan ","https://api.adorable.io/avatars/228/Ethan"));
      this.players.push(new Joueur("Romain ","https://api.adorable.io/avatars/228/Romain"));
      this.players.push(new Joueur("Ludo ","https://api.adorable.io/avatars/228/Ludo"));
      this.players.push(new Joueur("Elouan ","https://api.adorable.io/avatars/228/Elouan"));

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
      ""));

      /*this.event_list.push(new Event(
      "Folie Meurtrière",
      [
        "Nouvelle condition de victoire:",
        "Faites tomber les points d'un joueur à 0 pour gagner.",
        "Vous perdrez en cas d'évasion normale."
      ],
      "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F231d1da5-daf4-30d6-a3a1-e895505ccc42.jpg?crop=1500%2C1000%2C0%2C0&resize=685"));*/


  }

  GestionEvent(id_joueur: number,id_event: number){
    switch(id_event){
      case 0://Regain
      this.players[id_joueur].points+=1;
      break;
      case 1://Dépréciation
      this.players[id_joueur].points-=1;
      break;
      case 1://RAS

      break;

      default:
        console.log("Deso pas deso, l'event a pas chargé");
    }
  }

  NextStep(){
    this.index_round=(this.index_round+1)%4
  }


}
