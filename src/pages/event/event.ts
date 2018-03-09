import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { ChangePage } from '../../pages/change/change';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  constructor(public navCtrl: NavController, public moteur: MoteurProvider) {

  }
  GoToChange(){

    //this.navCtrl.push(ChangePage);
    this.navCtrl.setRoot(ChangePage);

    setTimeout(() => {//Timeout pour être sûr que l'event suivant n'apparraisse pas avant le changement de page
      this.moteur.GestionEvent(this.moteur.round[this.moteur.index_round][0],this.moteur.round[this.moteur.index_round][1]);
      this.moteur.NextStep();
    }, 100);
  }

}
