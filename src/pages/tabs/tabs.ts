import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ChangePage } from '../change/change';
import { HomePage } from '../home/home';
import { DebatePage } from '../debate/debate';
import { VChangeSPage } from '../VchangeS/VchangeS';
import { VotePage } from '../vote/vote';
import { BilanPage } from '../bilan/bilan';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BilanPage;
  tab3Root = ChangePage;

  constructor() {

  }
}
