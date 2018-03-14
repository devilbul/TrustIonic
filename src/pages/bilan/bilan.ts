import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { ChangePage } from '../../pages/change/change';
import { VChangeSPage } from '../VchangeS/VchangeS';

@Component({
  selector: 'page-bilan',
  templateUrl: 'bilan.html'
})

export class BilanPage {
  index: number = 0;

  constructor(public navCtrl: NavController, public moteur: MoteurProvider) {

  }
  Ready() {
    this.moteur.index_round=0;
    this.navCtrl.setRoot(ChangePage);
  }
  Prev() {
    this.index = (this.index - 1) % this.moteur.battles.length;
  }
  Next() {
    this.index = (this.index + 1) % this.moteur.battles.length;
  }


}