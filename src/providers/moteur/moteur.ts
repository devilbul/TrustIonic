import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoteurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoteurProvider {
  round: any=[];
  players: any=[];
  index_round: number=0;
  ally_reward: number=2;
  betray_reward: number=3;
  betray_penalty: number=-1;

  constructor(public http: HttpClient) {
    console.log('Hello MoteurProvider Provider');
  }

  GenerateRound(){}

  GestionEvent(id_joueur: number,id_event: number){
    switch(id_event){

      default:
        console.log("Deso pas deso, l'event a pas chargé");
    }
  }
  
  NextRound(){
    this.index_round+=1;
  }

  Event0(){

  }
  Event1(){
    
  }


}
