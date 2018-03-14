import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ChangePage } from '../pages/change/change';
import { HomePage } from '../pages/home/home';
import { NewGamePage } from '../pages/new-game/new-game';
import { NewPlayerPage } from '../pages/new-player/new-player';
import { TabsPage } from '../pages/tabs/tabs';
import { EventPage } from '../pages/event/event';
import { DebatePage } from '../pages/debate/debate';

import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Data } from '../providers/data/data';

import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { MoteurProvider } from '../providers/moteur/moteur';
import { VChangeSPage } from '../pages/VchangeS/VchangeS';
import { VotePage } from '../pages/vote/vote';
import { BilanPage } from '../pages/bilan/bilan';
//import { JoueurProvider } from '../providers/joueur/joueur';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ChangePage,
    HomePage,
    TabsPage,
    NewGamePage,
    NewPlayerPage,
    EventPage,
    DebatePage,
    VChangeSPage,
    VotePage,
    BilanPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ChangePage,
    HomePage,
    TabsPage,
    NewGamePage,
    NewPlayerPage,
    EventPage,
    DebatePage,
    VChangeSPage,
    VotePage,
    BilanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
    File,
    FilePath,
    Camera,
    MoteurProvider
  ]
})
export class AppModule {}
