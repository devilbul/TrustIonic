import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { ChangePage } from '../../pages/change/change';
import { VChangeSPage } from '../VchangeS/VchangeS';

@Component({
  selector: 'page-debate',
  templateUrl: 'debate.html'
})
export class DebatePage {

  constructor(public navCtrl: NavController, public moteur: MoteurProvider) {

  }
  Ready(){
    this.navCtrl.setRoot(VChangeSPage);
  }


}
