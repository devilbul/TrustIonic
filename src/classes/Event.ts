export class Event{
  title: String="Default";
  description: String[]=["Default"];
  image: String;

  constructor(title: String, description: String[], image: String){
    this.description=description;
    this.title=title;
    this.image=image;

  }

}
