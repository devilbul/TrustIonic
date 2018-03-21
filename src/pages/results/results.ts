import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { ChangePage } from '../../pages/change/change';

import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

import { Partie } from '../../providers/joueur/joueur';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {

  partie: Partie;
  parties: Partie[];

  constructor(private storage: Storage, public navCtrl: NavController, public moteur: MoteurProvider) {
    this.parties = [];
    this.partie = {
      'joueurs': this.moteur.players,
      'id': 0
    };
    this.storage.get('HallOfFame').then((val) => {

      if (val == null) {
        this.partie.id = 0;
        this.parties[0] = this.partie
      }
      else {
        this.parties = val;
        this.partie.id = this.parties.length;
        this.parties.push(this.partie);
      }
      this.storage.set('HallOfFame', this.parties);
    });

  }

  ionViewDidLoad() {

  }

  home() {
    this.moteur.round = []; this.moteur.battles = []; this.moteur.duo = [0, 1];
    this.moteur.ID_DUO = 10; this.moteur.event_list = []; this.moteur.index_round = 0;
    this.moteur.index_battles = [1, 1]; this.moteur.ally_reward = 2; this.moteur.tie = 0;
    this.moteur.betray_reward = 3; this.moteur.betray_penalty = -1; this.moteur.goal = 10;
    for(var i of this.moteur.players){
      i.reset();
    }
    this.navCtrl.setRoot(HomePage);
  }

  idWin(win: string) {
    if (win === "Perdant") { return 2 }
    if (win === "Vainqueur") { return 1 }
    if (win === "Porté(e) disparu(e)") { return 3 }
  }
}
