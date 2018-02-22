import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { ChangePage } from '../../pages/change/change';

@Component({
  selector: 'event-contact',
  templateUrl: 'event.html'
})
export class EventPage {

  constructor(public navCtrl: NavController, public moteur: MoteurProvider) {

  }
  GoToChange(){
    this.moteur.index_round+=1;
    this.navCtrl.push(ChangePage);
    this.navCtrl.setRoot(ChangePage);
  }

}
