import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChangePage } from '../change/change';
import { NewPlayerPage } from '../new-player/new-player';

import { Joueur } from '../../providers/joueur/joueur';
import { MoteurProvider } from '../../providers/moteur/moteur';

/**
 * Generated class for the NewGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-game',
  templateUrl: 'new-game.html',
})
export class NewGamePage {

  playerList: Joueur[];
  playerListLength: number;


  constructor(public moteur: MoteurProvider, public navCtrl: NavController, public navParams: NavParams) {
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
    this.moteur.GenerateFirstRound();
    this.moteur.GenerateEvent();
    this.navCtrl.setRoot(ChangePage);
  }

  supp(i: number) {
    this.moteur.players.splice(i,1);
  }


}
