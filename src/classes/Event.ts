export class Event{
  title: String="Default";
  description: String[]=["Default"];
  image: String;
  ban=[];//Liste des event ne pouvant apparaitre dans le même tour que celui-ci

  constructor(title: String, description: String[], image: String, ban: number[]){
    this.description=description;
    this.title=title;
    this.image=image;
    this.ban=ban;

  }

}
