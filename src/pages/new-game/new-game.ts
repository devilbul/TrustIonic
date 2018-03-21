import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { ChangePage } from '../change/change';
import { NewPlayerPage } from '../new-player/new-player';

import { Data } from '../../providers/data/data';
import { Joueur } from '../../providers/joueur/joueur';
import { MoteurProvider } from '../../providers/moteur/moteur';

@Component({
  selector: 'page-new-game',
  templateUrl: 'new-game.html',
})
export class NewGamePage {

  playerList: Joueur[];
  playerListLength: number;


  constructor(public data: Data, public moteur: MoteurProvider, public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    let backAction = platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 2)
  }


  ionViewDidLoad() {
    this.playerList = this.moteur.players;
    this.playerListLength = this.playerList.length;
    console.log(this.playerListLength);
  }

  newPlayer() {
    this.navCtrl.push(NewPlayerPage);
  }

  startGame() {
    this.data.save();

    this.moteur.GenerateFirstRound();
    this.moteur.GenerateEvent();
    this.navCtrl.setRoot(ChangePage);
  }

  supp(i: number) {
    this.moteur.players.splice(i, 1);
  }


}
