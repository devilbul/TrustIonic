import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { ChangePage } from '../../pages/change/change';
import { VChangeSPage } from '../VchangeS/VchangeS';
import { ResultsPage } from '../results/results';

@Component({
  selector: 'page-bilan',
  templateUrl: 'bilan.html'
})

export class BilanPage {
  index: number = 0;

  constructor(public navCtrl: NavController, public moteur: MoteurProvider) {

  }
  Ready() {
    if (this.moteur.EndRound()) {
      this.navCtrl.setRoot(ResultsPage);
    }
    else {
      this.moteur.index_battles = [0, 0];
      this.moteur.ResetPointModifiers();
      console.log(this.moteur.players);
      this.moteur.GenerateRound();
      console.log(this.moteur.round);
      this.moteur.index_round = 0;
      this.navCtrl.setRoot(ChangePage);
    }

  }
  Prev() {
    if (this.index - 1 < 0) {
      this.index = this.moteur.battles.length - 1;
    }
    else {
      this.index -= 1;
    }
  }
  Next() {
    this.index = (this.index + 1) % this.moteur.battles.length;
  }


}
