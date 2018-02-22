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
  players: Joueur[]=[];
  event_list: Event[]=[];
  index_round: number=0;
  ally_reward: number=2;
  betray_reward: number=3;
  betray_penalty: number=-1;
  id_active_player: number=0;


  constructor(public http: HttpClient) {
    this.GenerateRound();
    this.GenerateJoueurs();
    this.GenerateEvent();
    console.log('Hello MoteurProvider Provider');
  }

  GenerateRound(){
    this.round=[[2,1],[1,0],[3,1],[4,0]];
  }

  GetPlayer(index: number){
    return this.players[index];
  }

  GenerateJoueurs(){
    for(var i=0;i<6;i++){
      var joueur = new Joueur("Joueur "+i,"http://as01.epimg.net/betech/imagenes/2016/08/16/portada/1471354374_257181_1471354514_noticia_normal.jpg");
      this.players.push(joueur);
    }
    this.players[3].points=6;

  }

  GenerateEvent(){
    /*0*/this.event_list.push(new Event("Folie Meurtrière",["Nouvelle condition de victoire:","Faites tomber les points d'un joueur à 0 pour gagner.","Vous perdrez en cas d'évasion normale."],"https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprodmigration%2Fweb%2Fbin%2F231d1da5-daf4-30d6-a3a1-e895505ccc42.jpg?crop=1500%2C1000%2C0%2C0&resize=685"));
    /*1*/this.event_list.push(new Event("L'autre event", ["Blabla c'est l'autre event"], ""));

  }

  EventTitle(id_event){
    switch(id_event){
      case 0:
      return "Folie Meurtrière";
      case 1:
      return "Test Event";
    }

  }
  EventDescription(id_event){
      switch(id_event){
        case 0:
        return ["Nouvelle condition de victoire:","Faites tomber les points d'un joueur à 0 pour gagner.","Vous perdrez en cas d'évasion normale."];
        case 1:
        return["blabla c'est le deuxième event"];
      }
  }



  GestionEvent(id_joueur: number,id_event: number){
    switch(id_event){

      default:
        console.log("Deso pas deso, l'event a pas chargé");
    }
  }


}
