import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';


import { Joueur } from '../../providers/joueur/joueur';
import { RegleRolePage } from '../regleRole/regleRole';

@Component({
  selector: 'page-regleGeneral',
  templateUrl: 'regleGeneral.html',
})
export class RegleGeneralPage {

  playerList: Joueur[];
  playerListLength: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    let backAction = platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 2)
  }

  GotoRoles() {
    this.navCtrl.push(RegleRolePage);
  }

}
