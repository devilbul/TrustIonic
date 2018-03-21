import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewGamePage } from '../new-game/new-game';




import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import { HallOfFamePage } from '../hall-of-fame/hall-of-fame';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  constructor(public navCtrl: NavController) {
  }

  goToHall() {
    this.navCtrl.push(HallOfFamePage);
  }

  goToOtherPage() {
    this.navCtrl.push(NewGamePage);
  }

}
