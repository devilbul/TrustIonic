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



}
