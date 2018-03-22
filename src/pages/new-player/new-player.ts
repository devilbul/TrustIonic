import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { NewGamePage } from '../new-game/new-game';

import { Joueur } from '../../providers/joueur/joueur';
import { MoteurProvider } from '../../providers/moteur/moteur';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';


declare var cordova: any;

@Component({
  selector: 'page-new-player',
  templateUrl: 'new-player.html',
})

export class NewPlayerPage {

  form;

  constructor(public moteur: MoteurProvider, public navCtrl: NavController, private camera: Camera, private file: File, private filePath: FilePath,
    public platform: Platform, public toastCtrl: ToastController, public navParams: NavParams) {
    let backAction = platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 3)

    this.form = {
      player_img: "assets/imgs/newPlayerAvatar.png",
      player_pseudo: "",
    };

  }

  addPlayer(form) {
    if (form.player_pseudo != "") {
      var newPlayer = {
        img: form.player_img,
        pseudo: form.player_pseudo,
      }

      this.moteur.players.push(new Joueur(newPlayer.pseudo, newPlayer.img));
      this.presentToast("Le joueur à été ajouté.");
      this.navCtrl.push(NewGamePage);
    }
    else {
      this.presentToast("J'ai au moins besoin de ton pseudo...");
    }
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 10, // <----------- RESOLUTION de l'image
      saveToPhotoAlbum: false,
      correctOrientation: true,
      TypeSource: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {
      this.form.player_img = imageData;
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

}
