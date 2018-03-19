import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventPage } from '../event/event';
import { MoteurProvider } from '../../providers/moteur/moteur';

@Component({
  selector: 'page-change',
  templateUrl: 'change.html'
})
export class ChangePage {

  constructor(public navCtrl: NavController, public moteur: MoteurProvider) {

  }

  GoToEvent() {
    this.moteur.GestionEvent(this.moteur.round[this.moteur.index_round][0], this.moteur.round[this.moteur.index_round][1]);
    this.navCtrl.setRoot(EventPage);
  }
}
