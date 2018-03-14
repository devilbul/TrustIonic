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
    this.navCtrl.setRoot(EventPage);
    }
}
