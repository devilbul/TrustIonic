export class Partie {
  joueurs: Joueur[];
  id: number;
}

export class Joueur {
  pseudo: String = "Player";
  image: String = "";
  etat: String = "";//ex: survivor, traitor, follower ...
  following: number;//ID du traitre suivi si ce joueur est un follower
  points: number = 3;
  prev_points: number = 0;
  vote: String = "B";//Dernier vote du joueur, A=ally, B=betray
  buff: String = "";//Si le joueur subbit un effet particulier
  win: String = "";

  reset(){
    this.etat="";
    this.points=3;
    this.prev_points=0;
    this.vote="B";
    this.buff="";
    this.win="";
  }

  constructor(pseudo: String, image: String) {
    this.pseudo = pseudo;
    this.image = image;
    this.points = 3;
  }

  Role() {
    switch (this.etat) {
      case "survivor":
        return "Innocent";
      case "traitor":
        return "Traître";
      case "follower":
        return "Suiveur";
      case "rogue":
        return "Assassin";
      case "sherlock":
        return "Détective";
    }
  }

}
