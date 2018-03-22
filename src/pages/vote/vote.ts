import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventPage } from '../event/event';
import { MoteurProvider } from '../../providers/moteur/moteur';
import { ChangePage } from '../change/change';
import { VChangeSPage } from '../VchangeS/VchangeS';
import { BilanPage } from '../bilan/bilan';

@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html'
})
export class VotePage {

  constructor(public navCtrl: NavController, public moteur: MoteurProvider) {


  }

  ionViewDidEnter() {
    this.StartTimer();
  }

  Ally() {
    if (this.moteur.battles[this.moteur.index_battles[0]][this.moteur.index_battles[1]] == this.moteur.ID_DUO) {
      this.moteur.players[this.moteur.duo[0]].vote = "A";
      this.moteur.players[this.moteur.duo[1]].vote = "A";
    }
    else {
      this.moteur.players[this.moteur.battles[this.moteur.index_battles[0]][this.moteur.index_battles[1]]].vote = "A";
    }
    this.Next();
  }
  Betray() {
    if (this.moteur.battles[this.moteur.index_battles[0]][this.moteur.index_battles[1]] == this.moteur.ID_DUO) {
      this.moteur.players[this.moteur.duo[0]].vote = "B";
      this.moteur.players[this.moteur.duo[1]].vote = "B";
    }
    else {
      this.moteur.players[this.moteur.battles[this.moteur.index_battles[0]][this.moteur.index_battles[1]]].vote = "B";
    }
    this.Next();
  }
  Random() {
    var rand = this.moteur.Randint(0, 1);
    if (rand == 0) {
      this.moteur.players[this.moteur.battles[this.moteur.index_battles[0]][this.moteur.index_battles[1]]].vote = "A";
    }
    else {
      this.moteur.players[this.moteur.battles[this.moteur.index_battles[0]][this.moteur.index_battles[1]]].vote = "B";
    }
    this.moteur.players[this.moteur.battles[this.moteur.index_battles[0]][this.moteur.index_battles[1]]].buff = "";
    this.Next();
  }
  Next() {
    if (this.moteur.index_battles[0] >= this.moteur.battles.length - 1 && this.moteur.index_battles[1] == 1) {
      this.moteur.DoBattles();
      this.navCtrl.setRoot(BilanPage);
    }
    else {
      if (this.moteur.index_battles[1] == 0) {
        setTimeout(() => {//Timeout pour être sûr que l'event suivant n'apparraisse pas avant le changement de page
          this.moteur.index_battles[1] += 1;
        }, 100);
      }
      else {

        setTimeout(() => {//Timeout pour être sûr que l'event suivant n'apparraisse pas avant le changement de page
          this.moteur.index_battles[0] += 1;
          this.moteur.index_battles[1] = 0;
        }, 100);
      }
      this.navCtrl.setRoot(VChangeSPage);
    }
  }

  maxTime: any = 700000;
  timer: any;
  hidevalue: boolean;

  StartTimer() {
    this.timer = setTimeout(x => {
      if (this.maxTime <= 0) { }
      this.maxTime -= 1;

      if (this.maxTime > 0) {
        this.hidevalue = false;
        this.StartTimer();
      }

      else {
        this.Ally();
      }
    }, 1000);
  }

}
