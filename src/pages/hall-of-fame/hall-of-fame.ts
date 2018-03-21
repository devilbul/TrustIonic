import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { Joueur, Partie } from '../../providers/joueur/joueur';

@Component({
  selector: 'page-hall-of-fame',
  templateUrl: 'hall-of-fame.html',
})
export class HallOfFamePage {

  hallOf: Partie[];

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('HallOfFame').then((val) => {
      this.hallOf = val;
      console.log(this.hallOf);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HallOfFamePage');
  }

  resetHall(){
    this.storage.remove('HallOfFame');
    this.navCtrl.setRoot(HallOfFamePage);
  }

  goToOtherPage() {
    this.navCtrl.setRoot(HomePage);
  }

}
