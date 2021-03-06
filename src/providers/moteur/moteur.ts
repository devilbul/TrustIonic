import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePage } from '../../pages/change/change'
import { Event } from '../../classes/Event';

import { Joueur } from '../../providers/joueur/joueur';


@Injectable()
export class MoteurProvider {
  round: any = [];//Liste des events ayant lieu dans ce tour et des joueurs associés
  battles: any[] = [];//Liste des duel de joueurs
  duo: number[] = [0, 1];//Duo de joueur devant joueur ensemble lors d'un tour
  votes: any[] = []//Liste des votes des joueurs

  ID_DUO: number = 10;

  players: Joueur[] = [];//Liste des joueurs
  event_list: Event[] = [];//Liste de tous les events possibles

  index_round: number = 0;//Index indiquant à quel event du tour nous sommes
  index_battles: number[] = [1, 1];//Index indiquant à quel affrontement des battles nous sommes

  ally_reward: number = 2;//Gain si double Ally
  tie: number = 0;//Perte si double Betray
  betray_reward: number = 3;//Gain si Betray contre Ally
  betray_penalty: number = -1;//Perte si Ally contre Betray

  goal: number = 10;//objectif de point à atteindre

  constructor(public http: HttpClient) {

    //this.GenerateJoueurs();
    //this.GenerateFirstRound();

    //this.GenerateEvent();

    console.log('Hello MoteurProvider Provider');
    console.log(this.players);
  }

  GenerateFirstRound() {

    var list = this.AliveList();
    this.shuffleArray(list);
    this.round.push([list.pop(), 1]);
    while (list.length > 0) {
      this.round.push([list.pop(), 0]);
      console.log(list);
    }
    this.shuffleArray(this.round);

  }

  GenerateRound() {
    //this.round=[[2,2],[1,2],[5,2],[0,2],[3,2],[4,2]];
    //this.round=[[2,2],[1,2],[3,2],[0,2]];
    this.round = [];
    var event: number;
    var check: boolean;
    var prog: number = 0;
    var list = this.AliveList();
    this.shuffleArray(list);
    while (list.length > 0) {
      event = this.Randint(1, 7);
      check = true;
      for (var i = 0; i < prog; i++) {
        if (this.event_list[event].ban.indexOf(this.round[i][1]) > -1) {
          check = false;
        }
      }
      if ([1, 6].indexOf(event) > -1) {//Si event qui change d'état
        var count = 0;
        for (var j of this.players) {//Compte le nbr de rôles spéciaux
          if (j.etat != "survivor") {
            count++;
          }
        }
        if (this.players[list[list.length - 1]].etat != "survivor") {
          check = false;
        }
        if (count / this.players.length >= 0.5) {//Si roles spéciaux majoritaires
          check = false;
        }

      }
      if (check) {
        this.round.push([list.pop(), event]);
        prog++
      }
    }
    this.shuffleArray(this.round);

  }

  GenerateBattles() {
    //this.battles=[[0,1],[2,3],[4,5]];
    this.battles = [];
    this.duo = [];
    this.shuffleArray(this.round);
    if (this.round.length % 2 == 0) {
      for (var i = 0; i < this.round.length; i += 2) {
        this.battles.push([this.round[i][0], this.round[i + 1][0]]);
      }
    }
    else {
      this.shuffleArray(this.round);
      this.duo = [this.round[0][0], this.round[1][0]];
      this.battles.push([this.round[2][0], this.ID_DUO]);
      for (var j = 3; j < this.round.length; j += 2) {

        this.battles.push([this.round[j][0], this.round[j + 1][0]]);
      }
    }
    this.shuffleArray(this.battles);
  }

  GetPlayer(index: number) {
    return this.players[index];
  }

  GenerateJoueurs() {
    this.players.push(new Joueur("Ethan ", "https://api.adorable.io/avatars/228/Ethan"));
    this.players.push(new Joueur("Romain ", "https://api.adorable.io/avatars/228/Romain"));
    this.players.push(new Joueur("Ludo ", "https://api.adorable.io/avatars/228/Ludo"));
    this.players.push(new Joueur("Elouan ", "https://api.adorable.io/avatars/228/Eloluan"));
    /*this.players.push(new Joueur("Jean", "https://api.adorable.io/avatars/228/Jean"));
    this.players.push(new Joueur("Roger ", "https://api.adorable.io/avatars/228/Rooger"));*/
    this.players.push(new Joueur("Henry ", "https://api.adorable.io/avatars/228/Henry"));
    this.players.push(new Joueur("Marc-Olivier ", "https://api.adorable.io/avatars/228/Marco"));
  }

  GenerateEvent() {
    /*0*/this.event_list.push(new Event(
      "Survivant",
      ["Vous êtes un survivant",
        "Accumulez assez de points et",
        "enfuyez vous avec les autres survivants"],
      "http://www.canald.com/polopoly_fs/1.1253794.1371486103!/image/Seul_survivant.jpg_gen/derivatives/cd_796_449/Seul_survivant.jpg",
      []));

    /*1*/this.event_list.push(new Event(
      "Volte-face",
      ["Vous êtes maintenant un traitre",
        "Accumulez des points et enfuyez vous seul",
        "Vous ne faites pas équipe avec l’(es) autre(s) traître(s)"],
      "https://gorouadama.files.wordpress.com/2013/09/chaque-ami-moitie-dun-traitre-checked-l-0_m7sy.jpeg",
      [1, 6]));

    /*2*/this.event_list.push(new Event(
      "Le calme avant la tempête",
      ["Rien à signaler"],
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Tauchzeichen-Okay-Diving-Sign-Okay.png",
      []));

    /*3*/this.event_list.push(new Event(
      "Regain",
      ["Si vous avez moins de 9 points,",
        "vous en gagnez un"],
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Up_Hand_Sign_Emoji_large.png?v=1480481047",
      [3, 4]));

    /*4*/this.event_list.push(new Event(
      "Dépréciation",
      ["Si vous avez plus de 2 points",
        "Vous en perdez un"],
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_large.png?v=1513336434",
      [4, 3]));

    /*5*/this.event_list.push(new Event(
      "Double peine",
      ["Pour ce tour",
        "La trahison retire 2 points au joueur trahi",
        "Cela affecte tous les joueurs mais libre à vous de partager ou non cette info"],
      "https://ae01.alicdn.com/kf/HTB10cEIIpXXXXcVXFXXq6xXFXXX8/Dynasty-Warriors-7-Cosplay-Liu-Bei-Armes-p-e-Double.jpg_640x640.jpg",
      [5, 7]));

    /*6*/this.event_list.push(new Event(
      "A ses crochets",
      ["",
        "Vous ne pouvez vous enfuire que s’il/elle s’enfuit",
        "Vous n’avez plus à accumuler de points",
        "Vous perdez si les survivants ou un autre traître s’enfuient",
        "Si ce joueur disparait, vous disparaissez avec"],
      "https://pm1.narvii.com/6360/e9f6d7c891cd9ed65c51708048035f876902d302_hq.jpg",
      [6, 1]));

    /*7*/this.event_list.push(new Event(
      "L’union fait la force",
      ["Pour ce tour",
        "Le gain de point en cas d'alliance passe à 3",
        "Cela affecte tous les joueurs mais libre à vous de partager ou non cette info"],
      "https://i0.wp.com/gabonreview.com/wp-content/uploads/cooperation-1.jpg?resize=640%2C463",
      [7, 5]));

  }

  GestionEvent(id_joueur: number, id_event: number) {
    switch (id_event) {
      case 0://Survivant
        this.players[id_joueur].etat = "survivor";
        break;

      case 1://Traitre
        this.players[id_joueur].etat = "traitor";
        break;

      case 2://RAS

        break;

      case 3://Regain
        if (this.players[id_joueur].points < this.goal - 1) {
          this.players[id_joueur].points += 1;
        }
        break;

      case 4://Dépréciation
        if (this.players[id_joueur].points > 2) {
          this.players[id_joueur].points -= 1;
        }
        break;

      case 5://Double peine
        this.betray_penalty = -2;
        break;

      case 6://A ses crochets
        var trait_list = [];
        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].etat == "traitor") {
            trait_list.push(i);
          }
        }
        this.shuffleArray(trait_list);
        this.players[id_joueur].etat = "follower";
        this.players[id_joueur].following = trait_list[0];
        this.event_list[6].description[0] = this.players[trait_list[0]].pseudo + "est un(e) traître";
        break;

      case 7://L'union..
        this.ally_reward = 3;
        break;

      default:
        console.log("Deso pas deso, l'event a pas chargé");
    }
  }

  ResetPointModifiers() {
    this.ally_reward = 2;
    this.tie = 0;
    this.betray_reward = 3;
    this.betray_penalty = -1;
  }

  DoBattles() {
    for (var i = 0; i < this.battles.length; i++) {
      if (this.battles[i][1] == this.ID_DUO) {
        this.Battle(this.players[this.battles[i][0]], this.players[this.duo[0]]);
        this.players[this.battles[i][0]].points = this.players[this.battles[i][0]].prev_points;
        this.Battle(this.players[this.battles[i][0]], this.players[this.duo[1]]);
      }
      else {
        this.Battle(this.players[this.battles[i][0]], this.players[this.battles[i][1]]);
      }

    }
  }

  Battle(j1: Joueur, j2: Joueur) {
    j1.prev_points = j1.points;
    j2.prev_points = j2.points;
    if (j1.vote == "A" && j2.vote == "A") {
      j1.points += this.ally_reward;
      j2.points += this.ally_reward;
    }
    if (j1.vote == "A" && j2.vote == "B") {
      j1.points += this.betray_penalty;
      j2.points += this.betray_reward;
    }
    if (j1.vote == "B" && j2.vote == "A") {
      j1.points += this.betray_reward;
      j2.points += this.betray_penalty;
    }
    if (j1.vote == "B" && j2.vote == "B") {
      j1.points += this.tie;
      j2.points += this.tie;
    }

  }

  AliveList() {
    var list: number[] = [];
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].points > 0) {
        list.push(i);
      }
    }
    return list;
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  Randint(a: number, b: number) {
    return (a + Math.floor(Math.random() * (b - a + 1)));
  }


  NextStep() {
    this.index_round = (this.index_round + 1);
  }


}
