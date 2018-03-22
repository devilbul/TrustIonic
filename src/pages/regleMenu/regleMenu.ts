import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { ChangePage } from '../change/change';
import { NewPlayerPage } from '../new-player/new-player';

import { Data } from '../../providers/data/data';
import { Joueur } from '../../providers/joueur/joueur';
import { MoteurProvider } from '../../providers/moteur/moteur';

@Component({
  selector: 'page-regleMenu',
  templateUrl: 'regleMenu.html',
})
export class RegleMenuPage {

  playerList: Joueur[];
  playerListLength: number;


  constructor(public data: Data, public moteur: MoteurProvider, public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    let backAction = platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 2)
  }

  GotoRegles() {

  }

  GotoEvents() {

  }

  GotoRoles() {

  }

}
