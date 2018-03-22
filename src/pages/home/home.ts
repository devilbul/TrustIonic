import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { NewGamePage } from '../new-game/new-game';
import { HallOfFamePage } from '../hall-of-fame/hall-of-fame';

import { MoteurProvider } from '../../providers/moteur/moteur';
import { BilanPage } from '../bilan/bilan';
import { ChangePage } from '../change/change';
import { RegleMenuPage } from '../regleMenu/regleMenu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  constructor(public toastCtrl: ToastController, public moteur: MoteurProvider, private storage: Storage, public navCtrl: NavController, platform: Platform) {
    platform.registerBackButtonAction(() => {
      console.log("backPressed 1");
    },1);
  }

  goToHall() {
    this.storage.remove('Game');
    this.navCtrl.push(HallOfFamePage);
  }




  goToOtherPage() {
    this.navCtrl.push(NewGamePage);
  }

  goToRules() {
    this.navCtrl.push(RegleMenuPage);
  }

  continuer() {
    this.storage.get('Game').then((val) => {
      if(val == null){
        this.presentToast("Il n'y a pas de partie sauvgardé");
      }
      else{
      this.moteur.round = val[0];
      this.moteur.battles = val[1];
      this.moteur.duo = val[2];
      this.moteur.ID_DUO = val[3];
      this.moteur.players = val[4];
      this.moteur.event_list = val[5];
      this.moteur.index_round = val[6];
      this.moteur.index_battles = val[7];
      this.moteur.ally_reward = val[8];
      this.moteur.tie = val[9];
      this.moteur.betray_reward = val[10];
      this.moteur.betray_penalty = val[11];
      this.moteur.goal = val[12];
      this.navCtrl.push(ChangePage);}
    });

  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


}
