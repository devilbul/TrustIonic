import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ChangePage } from '../change/change';
import { HomePage } from '../home/home';
import { DebatePage } from '../debate/debate';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DebatePage;
  tab3Root = ChangePage;

  constructor() {

  }
}
