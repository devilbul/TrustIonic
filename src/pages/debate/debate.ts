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

  ionViewDidEnter() {
    this.StartTimer();
  }

  Ready() {
    this.allow_change=false;
    this.navCtrl.setRoot(VChangeSPage);
  }

  maxTime: any = 120;
  timer: any;
  hidevalue: boolean;
  allow_change: boolean = true;

  StartTimer() {
    this.timer = setTimeout(x => {
      if (this.maxTime <= 0) { }
      this.maxTime -= 1;

      if (this.maxTime > 0) {
        this.hidevalue = false;
        this.StartTimer();
      }
      else {
        if (this.allow_change) {
          this.Ready();
        }

      }
    }, 1000);
  }


}
