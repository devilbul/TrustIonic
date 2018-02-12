import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EventPage} from '../event/event';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }
  goToEvent() {
    this.navCtrl.push(EventPage);
    }

}
