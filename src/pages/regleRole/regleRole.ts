import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-regleRole',
  templateUrl: 'regleRole.html',
})
export class RegleRolePage {

  constructor(public navCtrl: NavController, platform: Platform) {
    let backAction = platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 2)
  }

}
