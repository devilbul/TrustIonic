import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventPage } from '../event/event';

@Component({
  selector: 'page-change',
  templateUrl: 'change.html'
})
export class ChangePage {

  constructor(public navCtrl: NavController) {

  }
  goToEvent() {
    this.navCtrl.push(EventPage);
    }
}
