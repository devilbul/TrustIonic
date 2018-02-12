import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewPlayerPage } from '../new-player/new-player';
import { Data } from '../../providers/data/data';

/**
 * Generated class for the NewGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-game',
  templateUrl: 'new-game.html',
})
export class NewGamePage {

  playerList: any;
  

  constructor(public data: Data, public navCtrl: NavController, public navParams: NavParams) {
  this.playerList = [];
  }

  
  ionViewDidLoad() {
    this.data.getPlayerList().subscribe(data => 
      {
        this.playerList = data.player;
      }
    ); 
  }

  newPlayer() {
    this.navCtrl.push(NewPlayerPage);
  }




}
