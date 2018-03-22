import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { ChangePage } from '../../pages/change/change';
import { ResultsPage } from '../results/results';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-bilan',
  templateUrl: 'bilan.html'
})

export class BilanPage {
  index: number = 0;

  constructor(private storage: Storage, public navCtrl: NavController, public moteur: MoteurProvider) {
  }

  Ready() {
    if (this.moteur.EndRound()) {
      this.navCtrl.setRoot(ResultsPage);
      this.storage.remove('Game');
    }
    else {
      this.moteur.ResetPointModifiers();
      console.log(this.moteur.players);
      this.moteur.GenerateRound();
      console.log(this.moteur.round);
      this.moteur.index_round = 0;
      this.navCtrl.setRoot(ChangePage);
      this.storage.set('Game', [this.moteur.round, this.moteur.battles, this.moteur.duo, this.moteur.ID_DUO, this.moteur.players, this.moteur.event_list, this.moteur.index_round, this.moteur.index_battles, this.moteur.ally_reward, this.moteur.tie, this.moteur.betray_reward, this.moteur.betray_penalty, this.moteur.goal]);
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
