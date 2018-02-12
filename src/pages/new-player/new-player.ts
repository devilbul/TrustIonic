import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { AlertController } from 'ionic-angular';
import { NewGamePage } from '../new-game/new-game';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the NewPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-new-player',
  templateUrl: 'new-player.html',
})

export class NewPlayerPage {

  playerLength;
  player;
  form;
  
  constructor(public navCtrl: NavController, private camera: Camera, private transfer: FileTransfer, private file: File, private filePath: FilePath, 
    public platform: Platform, public toastCtrl: ToastController, public alertCtrl: AlertController, public data: Data, public navParams: NavParams) {

    this.player = {};
    this.playerLength = 0;
    data.getPlayerList().subscribe(data => 
      {
        this.player = data.player[0];
        this.playerLength = data.player.length + 1;
      });
    this.form = {
      player_img: "assets/imgs/newPlayerAvatar.png",
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
                        player_id: "", player_img: "", player_pseudo: ""
                    };
            }
          }
        ]
      });
      alert.present();
      this.navCtrl.push(NewGamePage);
    }
    else{
      this.presentToast("Tu es certe peut être moche, mais j'ai au moins besoin de ton pseudo.");
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
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }



  private createFileName() {
    var newFileName;
    newFileName =  "player" + this.playerLength + "trust.png";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.form.player_img = cordova.file.dataDirectory + newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  // Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}


}
