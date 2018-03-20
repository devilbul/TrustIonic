import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { ChangePage } from '../../pages/change/change';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {

  constructor(public navCtrl: NavController, public moteur: MoteurProvider) {

  }

  idWin(win: string) {
    if(win === "Perdant"){return 2}
    if(win === "Vainqueur"){return 1}
    if(win === "Porté(e) disparu(e)"){return 3}
  }
}
