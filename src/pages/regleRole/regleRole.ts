import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { ChangePage } from '../change/change';
import { NewPlayerPage } from '../new-player/new-player';

import { Joueur } from '../../providers/joueur/joueur';
import { MoteurProvider } from '../../providers/moteur/moteur';

@Component({
  selector: 'page-regleRole',
  templateUrl: 'regleRole.html',
})
export class RegleRolePage {

  playerList: Joueur[];
  playerListLength: number;


  constructor(public moteur: MoteurProvider, public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    let backAction = platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 2)
  }



}
