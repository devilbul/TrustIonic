import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { AlertController } from 'ionic-angular';
import { NewGamePage } from '../new-game/new-game';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the NewPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-player',
  templateUrl: 'new-player.html',
})
export class NewPlayerPage {

  playerLength;
  player;
  form;
  public base64Image: string;
  
  constructor(private camera: Camera, public alertCtrl: AlertController, public data: Data, public navCtrl: NavController, public navParams: NavParams) {
    this.player = {};
    this.playerLength = 0;
    data.getPlayerList().subscribe(data => 
      {
        this.player = data.player[0];
        this.playerLength = data.player.length + 1;
      });
    this.form = {
      player_id: "",
      player_img: "",
      player_pseudo: "",
    };
  }

  addPlayer(form) {
    if(form.player_pseudo != "") {
      var newPlayer = {
          player_id: this.playerLength,
          player_img: form.player_img,
          player_pseudo: form.player_pseudo,
      }
      this.data.addPlayerToList(newPlayer);
      let alert = this.alertCtrl.create({
        title: 'Félicitation',
        subTitle: 'Votre joueur a été ajouté',  
        buttons: [
          {
            text: 'ok',
            handler: () => {
              this.form = {
                        player_id: "",
                        player_img: "",
                        player_pseudo: ""
                    };
            }
          }
        ]
      });
      alert.present();
      this.navCtrl.push(NewGamePage);
    }
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      let cameraImageSelector = document.getElementById(this.playerLength);
      let image = "data:image/jpeg;base64," + imageData;
      cameraImageSelector.setAttribute('src', image );
      this.form.player_img = cameraImageSelector;
      }, (err) => {
      console.log(err);
      });
    
  }


}
