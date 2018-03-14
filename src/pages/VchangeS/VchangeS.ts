import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventPage } from '../event/event';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { VotePage } from '../vote/vote';

@Component({
  selector: 'page-VchangeS',
  templateUrl: 'VchangeS.html'
})
export class VChangeSPage {

  constructor(public navCtrl: NavController, public moteur: MoteurProvider) {


  }
  Ready() {
    this.navCtrl.setRoot(VotePage);
    }
}
