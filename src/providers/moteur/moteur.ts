import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePage } from '../../pages/change/change'
import { Event } from '../../classes/Event';

import { Joueur } from '../../providers/joueur/joueur';


@Injectable()
export class MoteurProvider {
  round: any = [];//Liste des events ayant lieu dans ce tour et des joueurs associés
  battles: any[] = [];//Liste des duel de joueurs
  duo: number[] = [0, 1];//Duo de joueur devant jouer ensemble lors d'un tour

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
      event = this.Randint(1, 11);
      check = true;
      for (var i = 0; i < prog; i++) {
        if (this.event_list[event].ban.indexOf(this.round[i][1]) > -1) {
          check = false;
        }
      }
      if ([1, 6, 9, 10].indexOf(event) > -1) {//Si event qui change d'état
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
      while (this.players[this.round[0][0]].buff == "blind" || this.players[this.round[1][0]].buff == "blind") {
        this.shuffleArray(this.round);
      }
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
    /* this.players.push(new Joueur("Jean", "https://api.adorable.io/avatars/228/Jean"));
     this.players.push(new Joueur("Roger ", "https://api.adorable.io/avatars/228/Rooger"));
     this.players.push(new Joueur("Henry ", "https://api.adorable.io/avatars/228/Henry"));
     this.players.push(new Joueur("Marc-Olivier ", "https://api.adorable.io/avatars/228/Marco"));
     this.players.push(new Joueur("Pablo ", "https://api.adorable.io/avatars/228/Pablo"));*/

  }

  GenerateEvent() {
    /*0*/this.event_list.push(new Event(
      "Blanc comme neige",
      ["Vous êtes un Innocent",
        "Accumulez assez de points et",
        "enfuyez vous avec les autres Innocents"],
      "https://www.pngarts.com/files/1/Group-PNG-Picture.png",
      []));

    /*1*/this.event_list.push(new Event(
      "Veste retournée",
      ["Vous êtes maintenant un Traître",
        "Accumulez des points et enfuyez vous seul",
        "Vous ne faites pas équipe avec l’(es) autre(s) traître(s)"],
      "https://gorouadama.files.wordpress.com/2013/09/chaque-ami-moitie-dun-traitre-checked-l-0_m7sy.jpeg",
      [1, 6, 9, 10]));

    /*2*/this.event_list.push(new Event(
      "Le calme avant la tempête",
      ["Rien à signaler"],
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Tauchzeichen-Okay-Diving-Sign-Okay.png",
      []));

    /*3*/this.event_list.push(new Event(
      "Regain",
      ["Si vous avez moins de 9 points,",
        "Vous en gagnez un"],
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
      [5, 7, 11]));

    /*6*/this.event_list.push(new Event(
      "A ses crochets",
      ["",
        "Vous ne pouvez vous enfuire que s’il/elle s’enfuit",
        "Vous n’avez plus à accumuler de points",
        "Vous perdez si les Innocents ou un autre traître s’enfuient",
        "Si ce joueur disparait, vous disparaissez avec"],
      "https://pm1.narvii.com/6360/e9f6d7c891cd9ed65c51708048035f876902d302_hq.jpg",
      [6, 1, 9, 10]));

    /*7*/this.event_list.push(new Event(
      "L’union fait la force",
      ["Pour ce tour",
        "Le gain de point en cas d'alliance passe à 3",
        "Cela affecte tous les joueurs mais libre à vous de partager ou non cette info"],
      "https://i0.wp.com/gabonreview.com/wp-content/uploads/cooperation-1.jpg?resize=640%2C463",
      [7, 5, 11]));

    /*8*/this.event_list.push(new Event(
      "A l'aveugle",
      ["Vous ne pourrez pas choisir ce que vous allez voter lors de votre prochain face à face"],
      "https://image.freepik.com/free-icon/question-mark_318-52837.jpg",
      [8]));

    /*9*/this.event_list.push(new Event(
      "Folie Meurtrière",
      ["Vous êtes maintenant un Assassin",
        "Vous pourrez retirer un point à une joueur par tour",
        "Vous gagnez en atteignant 15 points ou si tous les Innocents disparraissent"],
      "https://secure.i.telegraph.co.uk/multimedia/archive/02382/horror_2382351b.jpg",
      [9, 10, 6, 1]));

    /*10*/this.event_list.push(new Event(
      "Elémentaire mon cher",
      ["Vous êtes maintenant un Détective",
        "Une fois par tour, vous pourrez tenter de désigner le rôle d’un joueur",
        "Si vous avez raison, ce joueur perdra 3 points, si vous avez tort, c’est vous qui perdrez 3 points",
        "Vous devez toujours vous enfuir avec les autres Innocents",
        "Vous disparaissez si tous les Innocents disparaissent."],
      "http://www.divorcemalin.com/wp-content/uploads/2016/02/d%C3%A9tective-priv%C3%A9.jpg",
      [10, 9, 6, 1]));

    /*11*/this.event_list.push(new Event(
      "Coopération forcée",
      ["Pour ce tour",
        "En cas de double trahison, les deux joueurs perdent 1 point",
        "Cela affecte tous les joueurs mais libre à vous de partager ou non cette info"],
      "http://www.worknetdupage.org/images/blog/2016-Mar/body-language/crushing-handshake.jpg",
      [11, 7, 5]));

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
        this.event_list[6].description[0] = this.players[trait_list[0]].pseudo + " est un(e) Traître, et vous êtes maintenant son suiveur";
        break;

      case 7://L'union..
        this.ally_reward = 3;
        break;

      case 8://Aveugle
        this.players[id_joueur].buff = "blind";
        break;

      case 9://assassin
        this.players[id_joueur].etat = "rogue";
        break;

      case 10://détective
        this.players[id_joueur].etat = "sherlock";
        break;

      case 11://Coop forcée
        this.tie = -1;
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

  EndRound() {
    var list = this.AliveList();
    var survivors = [];
    var sherlocks = [];
    var traitors = [];
    var followers = [];
    var rogues = [];

    var max_point = -1;
    var index_max = [];

    for (var i of list) {
      switch (this.players[i].etat) {
        case "survivor":
          survivors.push(i);
          break;
        case "sherlock":
          sherlocks.push(i);
          break;
        case "traitor":
          traitors.push(i);
          break;
        case "follower":
          followers.push(i);
          break;
        case "rogue":
          rogues.push(i);
          break;
      }
    }
    for (var joueur of this.players) {
      joueur.win = "Porté(e) disparu(e)";
    }
    for (var ijou of list) {
      this.players[ijou].win = "Prisonnier à jamais";
    }
    for (var ifoll2 of followers) {
      if (this.players[this.players[ifoll2].following].points <= 0) {
        this.players[ifoll2].points = 0;
      }
    }

    if (survivors.length == 0) {
      for (var isherl of sherlocks) {
        this.players[isherl].points = 0;
      }
      if (rogues.length > 0) {
        max_point = -1;
        index_max = [];
        for (var irog of rogues) {
          if (this.players[irog].points > max_point) {
            index_max = [irog];
            max_point = this.players[irog].points;
          }
          if (this.players[irog].points = max_point) {
            index_max.push(irog);
          }
        }
        for (var irog2 of index_max) {
          this.players[irog2].win = "Libre";
        }
        return true;
      }
    }

    max_point = -1;
    index_max = [];
    for (var irog3 of rogues) {
      if (this.players[irog3].points > max_point) {
        index_max = [irog3];
        max_point = this.players[irog3].points;
      }
      if (this.players[irog3].points = max_point) {
        index_max.push(irog3);
      }

    }
    if (max_point >= 15) {
      for (var irog4 of index_max) {
        this.players[irog4].win = "Libre";
      }
      return true;
    }

    max_point = -1;
    index_max = [];
    for (var itrai of traitors) {
      if (this.players[itrai].points > max_point) {
        index_max = [itrai];
        max_point = this.players[itrai].points;
      }
      if (this.players[itrai].points = max_point) {
        index_max.push(itrai);
      }

    }
    if (max_point >= this.goal || traitors.length + followers.length == list.length) {
      for (var itrai2 of index_max) {
        this.players[itrai2].win = "Libre";
      }
      for (var ifoll of followers) {
        if (index_max.indexOf(this.players[ifoll].following) > -1) {
          this.players[ifoll].win = "Libre";
        }
      }
      return true;
    }

    if (survivors.length > 0) {
      var vict_surviv = true;
      for (var isurv of survivors) {
        if (this.players[isurv].points < this.goal) {
          vict_surviv = false;
        }
      }
      for (var isherl2 of sherlocks) {
        if (this.players[isherl2].points < this.goal) {
          vict_surviv = false;
        }
      }
      if (vict_surviv) {
        for (var isurv2 of survivors) {
          this.players[isurv2].win = "Libre";
        }
        for (var isherl3 of sherlocks) {
          this.players[isherl3].win = "Libre";
        }
        return true;
      }
      if (survivors.length + sherlocks.length == list.length) {
        for (var isurv3 of survivors) {
          this.players[isurv3].win = "Libre";
        }
        for (var isherl4 of sherlocks) {
          this.players[isherl4].win = "Libre";
        }
        return true;
      }
    }
    return false;

  }


}
