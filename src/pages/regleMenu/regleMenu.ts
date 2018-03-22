import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { ChangePage } from '../change/change';
import { NewPlayerPage } from '../new-player/new-player';
import { RegleGeneralPage } from '../regleGeneral/RegleGeneral';

import { MoteurProvider } from '../../providers/moteur/moteur';
import { RegleRolePage } from '../regleRole/regleRole';

@Component({
  selector: 'page-regleMenu',
  templateUrl: 'regleMenu.html',
})
export class RegleMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    let backAction = platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 2)
  }

  GotoRegles() {
    this.navCtrl.push(RegleGeneralPage);
  }

  GotoRoles() {
    this.navCtrl.push(RegleRolePage);
  }

}
