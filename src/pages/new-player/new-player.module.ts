import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPlayerPage } from './new-player';

@NgModule({
  declarations: [
    NewPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPlayerPage),
  ],
})
export class NewPlayerPageModule {}
